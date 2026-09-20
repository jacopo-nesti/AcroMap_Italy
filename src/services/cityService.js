import { getProtectedContactMetadata } from "./contactService"
import { supabase } from "../lib/supabase"

function checkResult(result, tableName) {
  if (result.error) {
    throw new Error(
      `Errore caricamento ${tableName}: ${result.error.message}`
    )
  }

  return result.data
}

export async function getCities() {
  const [
    citiesResult,
    regionsResult,
    cityCommunitiesResult,
    communitiesResult,
    communityGroupsResult,
    groupsResult,
    communityCoursesResult,
    coursesResult,
    communityJamsResult,
    jamsResult,
    groupJamsResult,
    contactsResult,
    groupContactsResult,
    courseContactsResult,
    jamContactsResult,
    protectedContactsResult,
  ] = await Promise.all([
    supabase.from("cities").select("*").order("id"),
    supabase.from("regions").select("*").order("id"),
    supabase.from("city_communities").select("*"),
    supabase.from("communities").select("*"),
    supabase.from("community_groups").select("*"),
    supabase.from("groups").select("*").order("id"),

    supabase.from("community_courses").select("*"),
    supabase.from("courses").select("*").order("id"),

    supabase.from("community_jams").select("*"),
    supabase.from("jams").select("*").order("id"),
    supabase.from("group_jams").select("*"),

    supabase.from("contacts").select("*").eq("is_protected", false).order("id"),
    supabase.from("group_contacts").select("*"),
    supabase.from("course_contacts").select("*"),
    supabase.from("jam_contacts").select("*"),
    getProtectedContactMetadata(),
  ])

  const cities = checkResult(citiesResult, "cities")
  const regions = checkResult(regionsResult, "regions")
  const cityCommunities = checkResult(
    cityCommunitiesResult,
    "city_communities"
  )
  const communities = checkResult(
    communitiesResult,
    "communities"
  )
  const communityGroups = checkResult(
    communityGroupsResult,
    "community_groups"
  )
  const groups = checkResult(groupsResult, "groups")

  const communityCourses = checkResult(
    communityCoursesResult,
    "community_courses"
  )
  const courses = checkResult(coursesResult, "courses")

  const communityJams = checkResult(
    communityJamsResult,
    "community_jams"
  )
  const jams = checkResult(jamsResult, "jams")
  const groupJams = checkResult(groupJamsResult, "group_jams")

  const contacts = checkResult(contactsResult, "contacts")
  const groupContacts = checkResult(
    groupContactsResult,
    "group_contacts"
  )
  const courseContacts = checkResult(
    courseContactsResult,
    "course_contacts"
  )
  const protectedContacts = protectedContactsResult

  const jamContacts = checkResult(
    jamContactsResult,
    "jam_contacts"
  )

  // ----------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------

  const getContact = (contactId) =>
    contacts.find((contact) => contact.id === contactId)

  const getGroupContacts = (groupId) => {
    return groupContacts
      .filter((relation) => relation.group_id === groupId)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((relation) => getContact(relation.contact_id))
      .filter(Boolean)
  }

  const getCourseContact = (courseId) => {
    const relation = courseContacts
      .filter((item) => item.course_id === courseId)
      .sort((a, b) => a.sort_order - b.sort_order)[0]

    if (!relation) {
      return {}
    }

    const contact = getContact(relation.contact_id)

    if (!contact) {
      return {}
    }

    return {
      label: contact.label,
      url: contact.value,
    }
  }

  const getJamContact = (jamId) => {
    const relation = jamContacts
      .filter((item) => item.jam_id === jamId)
      .sort((a, b) => a.sort_order - b.sort_order)[0]

    if (!relation) {
      return null
    }

    return getContact(relation.contact_id) ?? null
  }

  const getProtectedGroupContacts = (groupId) =>
  protectedContacts
    .filter(
      (contact) =>
        contact.relation_type === "group" &&
        contact.relation_id === groupId
    )
    .sort((a, b) => a.sort_order - b.sort_order)

const getProtectedCourseContacts = (courseId) =>
  protectedContacts
    .filter(
      (contact) =>
        contact.relation_type === "course" &&
        contact.relation_id === courseId
    )
    .sort((a, b) => a.sort_order - b.sort_order)

const getProtectedJamContacts = (jamId) =>
  protectedContacts
    .filter(
      (contact) =>
        contact.relation_type === "jam" &&
        contact.relation_id === jamId
    )
    .sort((a, b) => a.sort_order - b.sort_order)

  // ----------------------------------------------------------
  // Ricostruzione della vecchia struttura cities.json
  // ----------------------------------------------------------
  
  return cities.map((city) => {
    const region = regions.find(
      (region) => region.id === city.region_id
    )

    const territorialCommunityIds = cityCommunities
      .filter((relation) => relation.city_id === city.id)
      .map((relation) => relation.community_id)

    const cityGroups = communityGroups
      .filter((relation) =>
        territorialCommunityIds.includes(relation.community_id)
      )
      .map((relation) =>
        groups.find((group) => group.id === relation.group_id)
      )
      .filter(Boolean)

    const legacyCommunities = cityGroups.map((group) => {
      const groupContactList = getGroupContacts(group.id)

      const getGroupContactValue = (type) =>
        groupContactList.find((contact) => contact.type === type)
          ?.value ?? null

      const groupCommunityIds = communityGroups
        .filter(
          (relation) =>
            relation.group_id === group.id &&
            territorialCommunityIds.includes(
              relation.community_id
            )
        )
        .map((relation) => relation.community_id)

      const courseIds = communityCourses
        .filter((relation) =>
          groupCommunityIds.includes(relation.community_id)
        )
        .map((relation) => relation.course_id)

      const groupCourses = courses
        .filter(
          (course) =>
            course.group_id === group.id &&
            courseIds.includes(course.id)
        )
        .map((course) => ({
          id: course.id,
          name: course.name,
          teachers: course.teachers ?? [],
          day: course.day,
          start_time: course.start_time?.slice(0, 5) ?? null,
          end_time: course.end_time?.slice(0, 5) ?? null,
          location: course.location,
          maps_url: course.maps_url,
          level: course.level,
          season: course.season,
          season_notes: course.season_notes,
          notes: course.notes,
          contact: getCourseContact(course.id),
          protected_contacts: getProtectedCourseContacts(course.id),
        }))

      const communityJamIds = communityJams
        .filter((relation) =>
          groupCommunityIds.includes(relation.community_id)
        )
        .map((relation) => relation.jam_id)

      const acceptedGroupJamIds = groupJams
        .filter(
          (relation) =>
            relation.group_id === group.id &&
            relation.status === "accepted"
        )
        .map((relation) => relation.jam_id)

      const groupJamList = jams
        .filter(
          (jam) =>
            communityJamIds.includes(jam.id) &&
            acceptedGroupJamIds.includes(jam.id)
        )
        .map((jam) => {
          const jamContact = getJamContact(jam.id)

          return {
            id: jam.id,
            type: jam.type,
            day: jam.day,
            start_time: jam.start_time?.slice(0, 5) ?? null,
            end_time: jam.end_time?.slice(0, 5) ?? null,
            location: jam.location,
            maps_url: jam.maps_url,
            season: jam.season,
            season_notes: jam.season_notes,
            updates_method: jamContact?.type ?? null,
            updates_url: jamContact?.value ?? null,
            notes: jam.notes,
            protected_contacts: getProtectedJamContacts(jam.id),
          }
        })

      return {
        id: group.id,
        name: group.name,
        description: group.description,

        whatsapp: getGroupContactValue("whatsapp"),
        instagram: getGroupContactValue("instagram"),
        facebook: getGroupContactValue("facebook"),
        website: getGroupContactValue("website"),

        protected_contacts: getProtectedGroupContacts(group.id),

        jams: groupJamList,
        courses: groupCourses,
      }
    })

    return {
      id: city.id,
      slug: city.slug,
      name: city.name,
      region: region?.name ?? null,
      province: city.province,

      coordinates: {
        lat: city.lat,
        lng: city.lng,
      },

      communities: legacyCommunities,
    }
  })
}
export function groupSharedJams(items = []) {
  const groupedBySharedId = new Map()

  return items.reduce((groupedJams, jam) => {
    if (jam.shared_id == null) {
      groupedJams.push(jam)
      return groupedJams
    }

    const existingJam = groupedBySharedId.get(jam.shared_id)

    if (existingJam) {
      existingJam.participatingCommunities.push(jam.community)
      return groupedJams
    }

    const regionalJam = {
      ...jam,
      participatingCommunities: [jam.community],
    }

    groupedBySharedId.set(jam.shared_id, regionalJam)
    groupedJams.push(regionalJam)
    return groupedJams
  }, [])
}

import SocialLinks from "./SocialLinks"
import JamCard from "./JamCard"
import CourseCard from "./CourseCard"

function CommunityCard({ community }) {

    return (
        <div className="community-card">

            <h3>{community.name}</h3>

            <p>{community.description}</p>

            <SocialLinks community={community}/>

            <h4>Jam</h4>
            {community.jams.length > 0 ? (
            <ul>
                {community.jams.map((jam) => (
                    <JamCard 
                        key={jam.id}
                        jam={jam}
                    />
                ))}
            </ul>
            ) : (
                <p>Nessuna jam al momento.</p>
            )}
            
            <h4>Corsi</h4>
            {community.courses.length > 0 ? (
            <ul>
                {community.courses.map((course) => (
                    <CourseCard key={course.id} course={course}/>
                ))}
            </ul>
            ) : (
                <p>Nessun corso disponibile.</p>
            )}

        </div>
    )
}

export default CommunityCard
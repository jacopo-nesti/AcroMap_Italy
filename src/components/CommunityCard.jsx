import SocialLinks from "./SocialLinks"
import JamCard from "./JamCard"
import CourseCard from "./CourseCard"

function CommunityCard({ community }) {

    return (
        <div className="community-card card shadow-sm mb-4 p-3">

            <h3 className="card-title">{community.name}</h3>

            <p className="card-text">{community.description}</p>

            <SocialLinks community={community}/>

            <h4>Jam</h4>
            {community.jams.length > 0 ? (
            <ul className="list-group mb-3">
                {community.jams.map((jam) => (
                    <JamCard key={jam.id} jam={jam}/>
                ))}
            </ul>
                ) : (
                    <p className="text-muted">Nessuna jam al momento.</p>
                )}
            
            <h4>Corsi</h4>
            {community.courses.length > 0 ? (
            <ul className="list-group">
                {community.courses.map((course) => (
                    <CourseCard key={course.id} course={course}/>
                ))}
            </ul>
                ) : (
                    <p className="text-muted">Nessun corso disponibile.</p>
                )}

        </div>
    )
}

export default CommunityCard
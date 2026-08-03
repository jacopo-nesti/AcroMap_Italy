function SocialLinks({ community }) {

    return (
        <div className="socials d-flex flex-wrap gap-2 mb-3">
            {community.whatsapp && (
                <a href={community.whatsapp} target="_blank" rel="noreferrer" className="btn btn-success btn-sm">
                    WhatsApp
                </a>
            )}

            {community.instagram && (
                <a href={community.instagram} target="_blank" rel="noreferrer" className="btn btn-danger btn-sm">
                    Instagram
                </a>
            )}

            {community.facebook && (
                <a href={community.facebook} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    Facebook
                </a>
            )}
        </div>
    )
}

export default SocialLinks
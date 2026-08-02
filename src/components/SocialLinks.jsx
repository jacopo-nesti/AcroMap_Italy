function SocialLinks({ community }) {

    return (
        <div className="socials">
            {community.whatsapp && (
                <a href={community.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp
                </a>
            )}

            {community.instagram && (
                <a href={community.instagram} target="_blank" rel="noreferrer">
                    Instagram
                </a>
            )}

            {community.facebook && (
                <a href={community.facebook} target="_blank" rel="noreferrer">
                    Facebook
                </a>
            )}
        </div>
    )
}

export default SocialLinks
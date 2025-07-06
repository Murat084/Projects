const Avatar = ({ src, alt, size, bg, color, className, title }) => {
    const styles = {
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bg,
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div className={className} style={styles}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    title={title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                alt[0]
            )}
        </div>
    );
};

export default Avatar;

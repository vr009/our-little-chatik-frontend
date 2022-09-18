export default function Picture (props) {

    return (
        <picture className={props.class}>
            <img
                src={props.src}
                alt={props.alt}
                style={{ height: '100%', display: 'block' ,'object-fit': props.objectFit} as any}
            />
        </picture>
    );
};

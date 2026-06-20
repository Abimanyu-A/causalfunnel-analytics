interface Props {

    width: number;

    height: number;
}

export default function DevicePreview({
    width,
    height
}: Props) {

    return (

        <div
            className="
                border
                rounded-lg
                bg-muted
                mx-auto
            "

            style={{

                aspectRatio:
                    `${width}/${height}`,

                width: 140
            }}
        />

    );

}
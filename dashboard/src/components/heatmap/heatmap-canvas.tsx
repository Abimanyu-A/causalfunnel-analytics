interface Props {
  points: {
    x: number;
    y: number;
  }[];
}

export default function HeatmapCanvas({
  points
}: Props) {

  return (

    <div className="
        relative
        aspect-video
        rounded-xl
        border
        overflow-hidden
        bg-muted
    ">

      {points.map((point, index) => (

        <div
          key={index}

          className="
            absolute
            w-12
            h-12
            rounded-full
            bg-red-500/40
          "

          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            transform: "translate(-50%, -50%)"
          }}
        />

      ))}

    </div>

  );
}
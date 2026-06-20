function SummaryItem({
    label,
    value
}: {
    label: string;
    value: React.ReactNode;
}) {

    return (

        <div>

            <p className="
                text-sm
                text-muted-foreground
            ">
                {label}
            </p>

            <p className="
                font-medium
                mt-1
            ">
                {value}
            </p>

        </div>

    );

}

export { SummaryItem };
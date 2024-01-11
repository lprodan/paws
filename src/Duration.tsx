import './Duration.css'
import duration from "dayjs/plugin/duration";

interface Props {
    value: duration.Duration;
}

export default function Duration({value}: Props) {
    const [
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    ] = [
        value.years(),
        value.months(),
        value.days(),
        value.hours(),
        value.minutes(),
        value.seconds()
    ]

        return <tr>
            <td><strong>{years}</strong></td>
            <td>years</td>
            <td><strong>{months}</strong></td>
            <td>months</td>
            <td><strong>{days}</strong></td>
            <td>days</td>
            <td><strong>{hours}</strong></td>
            <td>hours</td>
            <td><strong>{minutes}</strong></td>
            <td>minutes</td>
            <td><strong>{seconds}</strong></td>
            <td>seconds</td>
        </tr>
}
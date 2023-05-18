import moment from "moment";

type Str = string;

interface Props {
  thumbNail: Str;
  title: Str;
  StartDate: Date;
  endDate: Date;
}
export const SessionItem = ({
  thumbNail,
  title,
  StartDate,
  endDate,
}: Props): JSX.Element => {
  const momentStartDate = moment(StartDate).format("Do MMM");
  const momentEndDate = moment(endDate).format("Do MMM");

  return (
    <article>
      <div className="session">
        <img src={thumbNail} alt="" />
        <p>{title}</p>
        {/* <p>15 Feb - 15 Mar</p> */}

        <p>
          {momentStartDate} - {momentEndDate}
        </p>
      </div>
    </article>
  );
};

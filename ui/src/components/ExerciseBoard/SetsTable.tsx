import React, { Fragment } from "react";
import { secondsToPrettyString } from "../../functions/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHashtag, faHourglass } from "@fortawesome/free-solid-svg-icons";

type SetsTableProps = {
  setsData: {
    id: number;
    activitySeconds: number;
    restSeconds: number;
  }[];
  children?: React.ReactNode;
};

export default function SetsTable({ setsData }: SetsTableProps) {
  let i = 1;

  return (
    <div className="">
      <h3 className="text-2xl font-bold text-gray-900">Current set history</h3>
      <div className="grid">
        {setsData.map((row, index) => {
          const rowStartClass = `row-start-${index + 1}`;
          return (
            <Fragment key={row.id}>
              <div className={"align-middle col-span-1 mx-2 my-1 " + rowStartClass}>
                <FontAwesomeIcon icon={faHashtag} size="lg"/>
                <span className="text-lg font-bold">{i++}</span>
              </div>
              <div className={"col-span-4 " + rowStartClass}>
                <span className="align-middle mx-2 my-1 inline-flex items-center justify-center rounded-full bg-orange-100 px-2.5 py-0.5 text-orange-700">
                  <FontAwesomeIcon icon={faDumbbell} size="lg" />
                  <p className="whitespace-nowrap ml-1 txt-6xl">
                    {secondsToPrettyString(row.activitySeconds)}
                  </p>
                </span>
                <span className="align-middle mx-2 my-1 inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-blue-700">
                  <FontAwesomeIcon icon={faHourglass} size="sm" />
                  <p className="whitespace-nowrap ml-1 text-sm">
                    {secondsToPrettyString(row.restSeconds)}
                  </p>
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

import React from "react";

interface TableProps {
  data: Record<string, any>;
}

export const ObjectShowcase: React.FC<TableProps> = ({ data }) => {
  const keys = Object.keys(data);

  const convertValueToString = (value: any): string => {
    if (typeof value === "boolean") {
      return value ? "True" : "False";
    }
    return String(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td className="w-96">{convertValueToString(data[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface TableProps<T> {
  data: T[];
  columns?: string[];
}

const Table = <T extends Record<string, any>>({ data, columns }: TableProps<T>) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  const tableColumns = columns || Object.keys(data[0]);

  const getStatusStyle = (status: string) => {
    const styles = {
      "Checked In": "bg-success/10 text-success border-success/20",
      "Checked Out": "bg-muted text-muted-foreground border-border",
      "On Leave": "bg-warning/10 text-warning border-warning/20",
      "Present": "bg-success/10 text-success border-success/20",
      "Late": "bg-warning/10 text-warning border-warning/20",
      "Absent": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return styles[status as keyof typeof styles] || "";
  };

  const formatHeader = (key: string) => {
    return key
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-custom-md">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {tableColumns.map((column) => (
              <th
                key={column}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground"
              >
                {formatHeader(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-muted/30 transition-base"
            >
              {tableColumns.map((column) => {
                const value = row[column];
                const isStatus = column.toLowerCase().includes("status");
                
                return (
                  <td key={column} className="px-6 py-4 text-sm">
                    {isStatus ? (
                      <span className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                        ${getStatusStyle(value)}
                      `}>
                        {value}
                      </span>
                    ) : (
                      <span className="text-foreground">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

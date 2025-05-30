import { Pencil, Trash2 } from "lucide-react";

export default function ExpensesTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-right">Amount (₹)</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No matching records found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-right font-medium">
                  ₹{item.amount.toFixed(2)}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                    title="Edit"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    title="Delete"
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

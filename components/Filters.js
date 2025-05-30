export default function FilterControls({
  categories,
  categoryFilter,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-1/3"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-2/3"
      />
    </div>
  );
}

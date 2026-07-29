export default function CategoriesSection({ categories }) {
  return (
    <div className="form-section">
      <h3 className="form-section-title"><i className="fa-solid fa-list"></i> Categories (Select multiple) *</h3>
      <div className="checkbox-group">
          {categories.map(cat => (
              <label key={cat.id} className="checkbox-label">
                  <input type="checkbox" name="categories[]" value={cat.id} />
                  {cat.name}
              </label>
          ))}
      </div>
    </div>
  );
}

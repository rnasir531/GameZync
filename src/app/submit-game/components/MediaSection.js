export default function MediaSection() {
  return (
    <div className="form-section">
      <h3 className="form-section-title"><i className="fa-solid fa-images"></i> Media & Description</h3>
      <div className="form-group">
          <label>Game Description *</label>
          <textarea name="description" rows="4" placeholder="Briefly describe the story, gameplay loop, and key features..." required></textarea>
      </div>
      <div className="form-row split-row">
          <div className="form-group">
              <label>Cover Image *</label>
              <input type="file" id="cover_image" name="cover_image" accept="image/*" required className="file-input"/>
          </div>
          <div className="form-group">
              <label>Screenshots (Max 6) *</label>
              <input type="file" id="images" name="images[]" accept="image/*" multiple required className="file-input"/>
          </div>
      </div>
    </div>
  );
}

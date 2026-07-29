export default function BasicInfoSection() {
  return (
    <div className="form-section">
      <h3 className="form-section-title"><i className="fa-solid fa-circle-info"></i> Basic Information</h3>
      <div className="form-row">
          <div className="form-group full-width">
              <label>Your Email Address * (Used for communication regarding your submission)</label>
              <input type="email" name="submitter_email" placeholder="e.g. dev@example.com" required/>
          </div>
      </div>
      <div className="form-row split-row">
          <div className="form-group">
              <label>Game Title *</label>
              <input type="text" name="name" placeholder="e.g. Cyber Realm" required/>
          </div>
          <div className="form-group">
              <label>Developer/Studio *</label>
              <input type="text" name="developer_publisher" placeholder="e.g. Pixel Forge Studios" required/>
          </div>
      </div>
      <div className="form-row split-row">
          <div className="form-group">
              <label>Game Version *</label>
              <input type="text" name="game_version" placeholder="e.g. v1.0.0" required/>
          </div>
          <div className="form-group">
              <label>Release Year *</label>
              <input type="number" name="release_year" placeholder="e.g. 2024" required/>
          </div>
          <div className="form-group">
              <label>Direct Download Link *</label>
              <input type="url" name="direct_download_link" placeholder="https://example.com/file.zip" required/>
          </div>
      </div>
    </div>
  );
}

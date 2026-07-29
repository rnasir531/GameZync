export default function SystemRequirementsSection() {
  return (
    <div className="form-section">
      <h3 className="form-section-title"><i className="fa-solid fa-microchip"></i> System Requirements</h3>
      <div className="form-row split-row">
          <div className="form-group">
              <label>OS *</label>
              <input type="text" name="os" placeholder="Windows 10 64-bit" required/>
          </div>
          <div className="form-group">
              <label>Processor *</label>
              <input type="text" name="processor" placeholder="Intel Core i5" required/>
          </div>
      </div>
      <div className="form-row split-row">
          <div className="form-group">
              <label>Graphics Card *</label>
              <input type="text" name="graphics_card" placeholder="NVIDIA GTX 1060" required/>
          </div>
          <div className="form-group">
              <label>DirectX *</label>
              <input type="text" name="directx" placeholder="DirectX 11" required/>
          </div>
      </div>
      <div className="form-row split-row">
          <div className="form-group">
              <label>RAM *</label>
              <input type="text" name="ram" placeholder="e.g. 8 GB or 500 MB" required/>
          </div>
          <div className="form-group">
              <label>Storage *</label>
              <input type="text" name="storage" placeholder="e.g. 50 GB or 800 MB" required/>
          </div>
      </div>
    </div>
  );
}

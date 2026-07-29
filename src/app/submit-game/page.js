import SubmitGameForm from './SubmitGameForm';
import pool from '@/lib/db';

export const metadata = {
  title: 'Submit a Game - GameSync',
};

export const revalidate = 0; // ensure fresh categories

export default async function SubmitGamePage() {
  const { rows: categories } = await pool.query('SELECT * FROM categories ORDER BY name ASC');

  return (
    <section className="static-page-view" id="submit-game-view">
      <div className="static-page-header">
          <div className="static-page-icon-wrap"><i className="fa-solid fa-upload"></i></div>
          <h1 className="static-page-title">Submit Your Game</h1>
          <p className="static-page-subtitle">Are you a developer? Showcase your PC game on GameSync. Submitted games are subject to admin review before publishing.</p>
      </div>
      <div className="static-content-card submit-game-card">
          <SubmitGameForm categories={categories} />
      </div>
    </section>
  );
}

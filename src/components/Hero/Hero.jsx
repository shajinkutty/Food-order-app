import "./hero.css";
import heroImage from "../../assets/images/hero-img.jpg";
export default function Hero() {
  return (
    <section>
      <div className="container">
        <div className="image">
          <img src={heroImage} alt="" />
        </div>
      </div>
    </section>
  );
}

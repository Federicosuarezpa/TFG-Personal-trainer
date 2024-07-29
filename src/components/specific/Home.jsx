import logoMuscle from '../../svg/muscle-logo.svg';
import logoFood from '../../svg/generate-a-logo-that-represents-healthy-food-and-some-notebook-d.svg';
import logoCommunity from '../../svg/community-group-of-people-logo.svg';
import imageFirstTestimonial from '../../images/img-xN7JhW5zNVPjD8KCMOxfb.jpeg';
import imageSecondTestimonial from '../../images/img-3ep8O4CUSpF2w5o6lj3ri.jpeg';
import imageThirdTestimonial from '../../images/img-Ngymrg3pjOD0NotkIKYH2.jpeg';

export default function SpecificHome() {

    return (
        <>
            <div className="hero-section">
                <div className="overlay">
                    <div className="impact-text">
                        <h1>Ready for a Change? Get Fit Without Any Upfront Costs!</h1>
                        <p>No More Excuses: Begin Your Fitness Journey Today!</p>
                    </div>
                    <div className="logo-container">
                        <div className="logo-item">
                            <img src={logoFood}
                                 className="logo" alt="Healthy Food Logo"/>
                            <p>Customized meal plans tailored to your goals, with precise calorie counts for optimal
                                results.</p>
                        </div>
                        <div className="logo-item">
                            <img src={logoMuscle} className="logo" alt="Training Plan Logo"/>
                            <p>AI-driven online training programs designed to fit your needs, with flexible options for
                                adjustments.</p>
                        </div>
                        <div className="logo-item">
                            <img src={logoCommunity} className="logo" alt="Community Logo"/>
                            <p>Track your progress and share your journey with friends, while celebrating your
                                milestones.</p>
                        </div>
                    </div>

                </div>
            </div>
            <section className="testimonials-section">
                <h2>What Our Clients Say</h2>
                <div className="testimonials-container">
                    <div className="testimonial-item">
                        <img src={imageFirstTestimonial} alt="Testimonial 1" className="testimonial-image"/>
                        <p className="testimonial-text">This program transformed my life. The meal plans are perfect,
                            and the workouts are challenging yet enjoyable!</p>
                        <p className="testimonial-name">- Janet Leison</p>
                    </div>
                    <div className="testimonial-item">
                        <img src={imageSecondTestimonial} alt="Testimonial 2" className="testimonial-image"/>
                        <p className="testimonial-text">I love the personalized approach and the flexibility of the
                            training program. Highly recommend it!</p>
                        <p className="testimonial-name">- Maribel Smith</p>
                    </div>
                    <div className="testimonial-item">
                        <img src={imageThirdTestimonial} alt="Testimonial 3" className="testimonial-image"/>
                        <p className="testimonial-text">The community support is amazing. I've achieved more than I
                            thought possible thanks to this program!</p>
                        <p className="testimonial-name">- Michaela Brown</p>
                    </div>
                </div>
            </section>
        </>
    );
}
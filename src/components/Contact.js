import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you.</p>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        {/* UK-specific FAQ Entries */}
        <div className="faq">
          <h3> How much exercise should I aim for each week in the UK?</h3>
          <p> UK health authorities, such as the NHS, recommend at least 150 minutes of moderate-intensity activity or 75 minutes of vigorous-intensity activity each week, alongside strength exercises on two or more days a week.</p>
        </div>

        <div className="faq">
          <h3> What are the components of a healthy diet in the UK?</h3>
          <p> A balanced UK diet includes at least five portions of a variety of fruit and vegetables daily, meals based on higher-fiber starchy foods, some dairy or dairy alternatives, some proteins, and small amounts of unsaturated oils or spreads.</p>
        </div>

        <div className="faq">
          <h3> Which foods should I avoid to maintain a healthy weight?</h3>
          <p> In the UK, it's advised to limit foods and drinks high in fat, salt and sugar, including sugary soft drinks, high-fat snacks, and fast food.</p>
        </div>

        <div className="faq">
          <h3> How much water is recommended to drink daily in the UK?</h3>
          <p> The NHS suggests drinking 6 to 8 glasses of fluids a day, which can include water, lower-fat milk, and sugar-free drinks, including tea and coffee.</p>
        </div>

        <div className="faq">
          <h3>Can I still eat carbohydrates and lose weight?</h3>
          <p>Yes, the NHS suggests that starchy carbohydrates should make up just over a third of the food you eat. Choosing higher fiber, wholegrain varieties, like wholewheat pasta and brown rice, can help you feel full longer and manage your weight.Yes, the NHS suggests that starchy carbohydrates should make up just over a third of the food you eat. Choosing higher fiber, wholegrain varieties, like wholewheat pasta and brown rice, can help you feel full longer and manage your weight.</p>
        </div>

        <div className="faq">
          <h3>Is it better to work out in the morning or evening?</h3>
          <p>The best time for a workout is whatever time fits your schedule and feels best for your body. Consistency is key.</p>
        </div>

        <div className="faq">
          <h3>Should I take dietary supplements in the UK?</h3>
          <p>The NHS states that most people do not need to take dietary supplements and can get all the vitamins and minerals they need by eating a varied and balanced diet, although there are exceptions such as vitamin D during the autumn and winter months.</p>
        </div>

        <div className="faq">
          <h3>What role does sleep play in maintaining a healthy lifestyle?</h3>
          <p>According to the UK's Sleep Council, adults need 7-9 hours of sleep a night. Adequate sleep is vital for physical health, cognitive performance, and mental well-being.According to the UK's Sleep Council, adults need 7-9 hours of sleep a night. Adequate sleep is vital for physical health, cognitive performance, and mental well-being.</p>
        </div>

        <div className="faq">
          <h3>What's more important for health, cardio or weight training?</h3>
          <p>Both cardio and strength training are important for overall health. The NHS recommends both types of exercise for different health benefits, including improved heart health and muscle strength.</p>
        </div>

        <div className="faq">
          <h3>How can I stay motivated with my fitness and diet routine?</h3>
          <p>Setting realistic goals, keeping a diary of your progress, involving friends or family for support, and mixing up your routine to keep it interesting are some NHS-recommended strategies for staying motivated.</p>
        </div>

        <div className="faq">
          <h3> What foods are best after a workout for recovery?</h3>
          <p> Post-exercise, it's important to eat foods that combine protein and carbohydrates, such as a chicken and vegetable stir-fry or a tuna sandwich on wholegrain bread.</p>
        </div>

        <div className="faq">
          <h3> How should I manage my calorie intake when trying to build muscle and lose fat?</h3>
          <p> The NHS suggests a healthy, balanced diet and a calorie intake that's less than the amount you burn. For muscle building, focus on protein-rich foods and regular strength training.</p>
        </div>

        {/* More FAQs can be added here */}
      </div>
    </div>
  );
}

export default Contact;

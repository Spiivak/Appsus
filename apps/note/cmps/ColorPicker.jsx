const { useState } = React

export const ColorPicker = ({ onUpdateColor }) => {
  const [isActive, setIsActive] = useState('')

  const updateColor = (value) => {
    setIsActive(value)
    onUpdateColor(value)
  };

  return (
    <section className="colors">
      <div className={`clr1 btn ${isActive === '#f28b82' ? 'checked' : ''}`} onClick={() => updateColor('#f28b82')}></div>
      <div className={`clr2 btn ${isActive === '#fff475' ? 'checked' : ''}`} onClick={() => updateColor('#fff475')}></div>
      <div className={`clr3 btn ${isActive === '#fbbc04' ? 'checked' : ''}`} onClick={() => updateColor('#fbbc04')}></div>
      <div className={`clr4 btn ${isActive === '#ccff90' ? 'checked' : ''}`} onClick={() => updateColor('#ccff90')}></div>
      <div className={`clr5 btn ${isActive === '#a7ffeb' ? 'checked' : ''}`} onClick={() => updateColor('#a7ffeb')}></div>
      <div className={`clr6 btn ${isActive === '#cbf0f8' ? 'checked' : ''}`} onClick={() => updateColor('#cbf0f8')}></div>
      <div className={`clr7 btn ${isActive === '#aecbfa' ? 'checked' : ''}`} onClick={() => updateColor('#aecbfa')}></div>
      <div className={`clr8 btn ${isActive === '#d7aefb' ? 'checked' : ''}`} onClick={() => updateColor('#d7aefb')}></div>
      <div className={`clr9 btn ${isActive === '#fdcfe8' ? 'checked' : ''}`} onClick={() => updateColor('#fdcfe8')}></div>
      <div className={`clr10 btn ${isActive === '#e6c9a8' ? 'checked' : ''}`} onClick={() => updateColor('#e6c9a8')}></div>
      <div className={`clr11 btn ${isActive === '#e8eaed' ? 'checked' : ''}`} onClick={() => updateColor('#e8eaed')}></div>
      <div className={`clr12 btn ${isActive === '#fff' ? 'checked' : ''}`} onClick={() => updateColor('#fff')}></div>
    </section>
  );
};
const MyMessage = ({mes}) => {
    if(mes.attachments.length > 0){
        return (
            <img src={mes.attachments[0].file} alt="message-attachemnt" className="message-image" style={{float: 'right'}} />
        )
    }
    return (
      <div className="message" style={{float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50'}}>
          {mes.text ? mes.text.slice(0, 3) === '<p>' && mes.text.slice(-4) === '</p>' ? mes.text.slice(3, mes.text.length - 4) : mes.text : mes.text}
      </div>
    )
}

export default MyMessage;
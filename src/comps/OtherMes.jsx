const OtherMes = ({lastMes, mes}) => { 
    const isFirstMesByUser = !lastMes || lastMes.sender.username !== mes.sender.username;
    return (
      <div className="message-row">
        {isFirstMesByUser && (
            <div className="message-avatar" style={{backgroundImage: `url("${mes.sender.avatar}")`}}/>
        )}
        {
            mes.attachments.length > 0 ? (
                <img src={mes && mes.attachments[0].file} alt="message-attachemnt" className="message-image" style={{marginLeft: isFirstMesByUser ? '4px' : '48px'}} />
            ) : (
                <div className="message" style={{float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMesByUser ? '4px' : '48px'}}>
                    {mes ? mes.text.slice(0, 3) === '<p>' && mes.text.slice(-4) === '</p>' ? mes.text.slice(3, mes.text.length - 4) : mes.text : mes.text}
                </div>
            )
        }
      </div>
    )
}

export default OtherMes
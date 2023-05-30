const Message = ({msg, type}) => {
  return (
    <div className={`w-full text-sm text-red-900 p-4 ${type === 'error' ? 'bg-red-300' : 'bg-green-300'}`}>
        {msg}
    </div>
  )
}

export default Message
function ModalContainer({ children, isOpen, setIsOpen, setStep }) {
  if (!isOpen) return;

  const closeHandler = () => {
    setIsOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed top-0 right-0 w-svw h-svh bg-black/20 z-10 backdrop-blur-sm">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="relative min-w-10 min-h-10" >
          {children}
          <button onClick={closeHandler} className="absolute top-5 left-5">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;

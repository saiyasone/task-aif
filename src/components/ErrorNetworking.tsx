type Prop = {
  message: string;
};
function ErrorNetworking({ message }: Prop) {
  return (
    <div className="w-full fixed bottom-0 transition-all ease-in-out duration-[2s] px-3 py-3 z-[1] bg-red-500">
      <div className="flex justify-center">
        <p className="text-white text-lg md:text-2xl">{message}</p>
      </div>
    </div>
  );
}

export default ErrorNetworking;

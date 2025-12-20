import { Brain } from "lucide-react";
export default function UseCases() {
  return (
    <section className="w-full h-screen bg-neutral-950 py-20 px-40">
      <div className="w-full h-full grid grid-cols-[40%_auto]">
        <div className="font-extralight w-2/3 flex flex-col justify-between">
          <h1 className="text-5xl text-white">Who's This For</h1>
          <p className="text-sm font-extralight text-white">
            If you felling any of these, this service is for you, a place where you can share yor fellings, thoughts and no one is going to judge you. 
          </p>
        </div>

        <div className="grid grid-rows-3 text-white gap-5">
          <div className="bg-neutral-800 rounded-2xl px-5 py-5 grid grid-cols-[30%_auto]">
            <div className="flex justify-center items-center">
              <Brain size={50}/>
            </div>
            <div className="py-9">
              <h1 className="text-3xl text-white mb-3">If You Have</h1>
              <p className="text-gray-400"> a mental or phycological problem currently or previously.</p>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-2xl px-5 py-5 grid grid-cols-[30%_auto]">
            <div className="flex justify-center items-center">
              <Brain size={50}/>
            </div>
            <div className="py-9">
              <h1 className="text-3xl text-white mb-3">If You Don't</h1>
              <p className="text-gray-400"> fell to share your condition with anyone.</p>
            </div>
          </div>

          <div className="bg-neutral-800 rounded-2xl px-5 py-5 grid grid-cols-[30%_auto]">
            <div className="flex justify-center items-center">
              <Brain size={50}/>
            </div>
            <div className="py-9">
              <h1 className="text-3xl text-white mb-3">If You Don't</h1>
              <p className="text-gray-400"> have anyone to share it to.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

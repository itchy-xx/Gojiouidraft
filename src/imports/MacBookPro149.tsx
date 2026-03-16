import svgPaths from "./svg-d2d7kixpet";
import imgEllipse2 from "figma:asset/8458f02215087093564f3494665009976b903772.png";

function Intro() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Intro">
      <div className="flex flex-col font-['SF_Pro_Rounded:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c1421] text-[36px] text-center tracking-[0.36px] whitespace-nowrap">
        <p className="leading-none">Settings 🌟</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input">
      <div className="bg-[#f7fbff] col-1 h-[48px] ml-0 mt-0 relative rounded-[12px] row-1 w-[388px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#d4d7e3] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      </div>
      <div className="col-1 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center ml-[16px] mt-[16px] not-italic relative row-1 text-[#8897ad] text-[16px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-none">{`Select 3 items `}</p>
      </div>
    </div>
  );
}

function Knob() {
  return <div className="-translate-y-1/2 absolute bg-white right-[2px] rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_3px_8px_0px_rgba(0,0,0,0.15),0px_3px_1px_0px_rgba(0,0,0,0.06)] size-[27px] top-1/2" data-name="Knob" />;
}

function LoginForm() {
  return (
    <div className="absolute h-[625px] left-[85px] top-[179px] w-[388px]" data-name="Login Form">
      <Intro />
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start leading-[0] left-0 top-[191px] w-[388px]" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Preferences</p>
        </div>
        <Input />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-0 top-[313px] w-[388px]" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Location Sharing</p>
        </div>
      </div>
      <div className="absolute bg-[#34c759] h-[31px] left-[152px] overflow-clip rounded-[100px] top-[305px] w-[51px]" data-name="Toggle">
        <Knob />
      </div>
      <div className="-translate-x-full -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[174px] not-italic text-[#1e4ae9] text-[16px] text-right top-[386px] tracking-[0.16px] w-[174px]">
        <p className="leading-none whitespace-pre-wrap">{`Participant | Organiser `}</p>
      </div>
      <div className="absolute bg-[#5661f6] content-stretch flex h-[52px] items-center justify-between left-0 py-[16px] rounded-[12px] top-[436px] w-[388px]" data-name="Main Button">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white tracking-[0.2px] whitespace-nowrap">
          <p className="leading-none">Update</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input">
      <div className="bg-[#f7fbff] col-1 h-[48px] ml-0 mt-0 relative rounded-[12px] row-1 w-[388px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#d4d7e3] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      </div>
      <div className="col-1 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center ml-[16px] mt-[16px] not-italic relative row-1 text-[#8897ad] text-[16px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-none">Which area do you stay in?</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute h-[92px] left-[446px] top-[317px] w-[388px]" data-name="Form">
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start leading-[0] left-[-360px] top-[-58px] w-[388px]" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Neighbourhood</p>
        </div>
        <Input1 />
      </div>
    </div>
  );
}

function LeftSide8Column() {
  return (
    <div className="absolute h-[804px] left-[238px] top-[56px] w-[558px]" data-name="Left side 8 Column">
      <LoginForm />
      <Form />
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-white relative size-full" data-name="MacBook Pro 14' - 9">
      <LeftSide8Column />
      <div className="absolute h-[269px] left-[878px] top-[205px] w-[294px]">
        <img alt="" className="absolute block max-w-none size-full" height="269" src={imgEllipse2} width="294" />
      </div>
      <div className="absolute left-[1140px] overflow-clip size-[32px] top-[442px]" data-name="Edit">
        <div className="absolute inset-[7.83%_7.83%_8.33%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-3.73%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8284 28.8284">
              <path d={svgPaths.pcbfd300} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
import imgImage8 from "figma:asset/b6b6922d1633af74dbd30a5d2b9b8719f4cdeb7d.png";

function Intro() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Intro">
      <div className="flex flex-col font-['SF_Pro_Rounded:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c1421] text-[36px] text-center tracking-[0.36px] whitespace-nowrap">
        <p className="leading-none">Get Started Today 🌟</p>
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
        <p className="leading-none">Enter your name</p>
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
        <p className="leading-none">Example@email.com</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input">
      <div className="bg-[#f7fbff] col-1 h-[48px] ml-0 mt-0 relative rounded-[12px] row-1 w-[388px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#d4d7e3] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      </div>
      <div className="col-1 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center ml-[16px] mt-[16px] not-italic relative row-1 text-[#8897ad] text-[16px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-none">At least 8 characters</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-end justify-center left-0 top-[84px] w-[388px]" data-name="Form">
      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Name</p>
        </div>
        <Input />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Email</p>
        </div>
        <Input1 />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 w-full" data-name="Input">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center not-italic relative shrink-0 text-[#0c1421] text-[16px] tracking-[0.16px] whitespace-nowrap">
          <p className="leading-none">Password</p>
        </div>
        <Input2 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e4ae9] text-[16px] text-center tracking-[0.16px] whitespace-nowrap">
        <p className="leading-none">Forgot Password?</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#1e4ae9] text-[16px] top-[296.5px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-none">{`Participant | Organiser `}</p>
      </div>
      <div className="absolute bg-[#5661f6] content-stretch flex items-center justify-between left-0 py-[16px] rounded-[12px] top-[328px] w-[388px]" data-name="Main Button">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white tracking-[0.2px] whitespace-nowrap">
          <p className="leading-none">Register</p>
        </div>
      </div>
    </div>
  );
}

function Or() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center py-[10px] relative shrink-0 w-[388px]" data-name="Or">
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.5 1">
            <line id="Line 2" stroke="var(--stroke-0, #CFDFE2)" x2="169.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#294957] text-[16px] text-center tracking-[0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-none">Or</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169.5 1">
            <line id="Line 2" stroke="var(--stroke-0, #CFDFE2)" x2="169.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SocialSignIn() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[512px]" data-name="Social Sign in">
      <Or />
    </div>
  );
}

function LoginForm() {
  return (
    <div className="h-[625px] relative shrink-0 w-[388px]" data-name="Login Form">
      <Intro />
      <Form />
      <SocialSignIn />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[191px] text-[#122b31] text-[0px] text-center top-[610.5px] tracking-[0.18px] w-[382px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="font-['Inter:Regular',sans-serif] not-italic text-[18px] whitespace-pre-wrap">
          <span className="leading-[1.6] text-[#313957]">{`Have an account? `}</span>
          <span className="leading-[1.6] text-[#1e4ae9]">Sign in</span>
        </p>
      </div>
    </div>
  );
}

function LeftSide8Column() {
  return (
    <div className="absolute content-stretch flex h-[982px] items-center justify-center left-0 top-0 w-[784px]" data-name="Left side 8 Column">
      <LoginForm />
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-white relative size-full" data-name="MacBook Pro 14' - 6">
      <div className="absolute h-[899px] left-[798px] rounded-[47px] top-[41px] w-[667px]" data-name="image 8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[47px]">
          <img alt="" className="absolute h-full left-[-84.77%] max-w-none top-0 w-[201.93%]" src={imgImage8} />
        </div>
      </div>
      <LeftSide8Column />
    </div>
  );
}
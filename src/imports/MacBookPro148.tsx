import svgPaths from "./svg-0pw2mvhhvo";
import imgAvatar from "figma:asset/fa7196888fa8e719f52f041b238d7bb4d0dad7e1.png";
import imgFrame1 from "figma:asset/31a52f64b284fc978899ed0ed694a9e631c356c5.png";
import imgAvatar1 from "figma:asset/6a43a919cfeb0244cd69d1fb53d66ff733278e8f.png";
import imgAvatar2 from "figma:asset/122957d512f9e03a7ec5373e36d51864b7931b0d.png";
import imgAvatar3 from "figma:asset/992deecf9fad4e52fdf505a4f45eef272f346783.png";

function Avatar() {
  return (
    <div className="bg-[#78e378] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[48px]" data-name="Avatar">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[16px] text-white">S</p>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex items-center not-italic relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px relative text-[#011627] text-[16px] whitespace-pre-wrap">Swimming</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#707991] text-[12px]">16:15</p>
    </div>
  );
}

function Message() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Message">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#707991] text-[14px]">
        <span className="leading-[18px] text-[#292d32]">Ziyang</span>
        <span className="leading-[18px]">: rmb to bring towel</span>
      </p>
    </div>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="Texts">
      <Name />
      <Message />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#f566dd] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[48px]" data-name="Avatar">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[16px] text-white">P</p>
    </div>
  );
}

function Name1() {
  return (
    <div className="content-stretch flex items-center not-italic relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px relative text-[#011627] text-[16px] whitespace-pre-wrap">Pilates</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#707991] text-[12px]">16:15</p>
    </div>
  );
}

function Message1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Message">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#707991] text-[14px]">
        <span className="leading-[18px] text-[#292d32]">Lummy</span>
        <span className="leading-[18px]">: grip socks is impt !</span>
      </p>
    </div>
  );
}

function Texts1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="Texts">
      <Name1 />
      <Message1 />
    </div>
  );
}

function Avatar2() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[48px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar} />
    </div>
  );
}

function Name2() {
  return (
    <div className="content-stretch flex items-center not-italic relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px relative text-[#011627] text-[16px] whitespace-pre-wrap">Art Class</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#deffff] text-[12px]">Tue</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[18px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgFrame1} />
    </div>
  );
}

function Message2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Message">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#deffff] text-[14px]">
        <span className="leading-[18px] text-[#011627]">Emily</span>
        <span className="leading-[18px]">{`: `}</span>
      </p>
      <Frame />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#deffff] text-[14px]">Editorial</p>
    </div>
  );
}

function Texts2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="Texts">
      <Name2 />
      <Message2 />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[48px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar1} />
    </div>
  );
}

function Name3() {
  return (
    <div className="content-stretch flex items-center not-italic relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px relative text-[#011627] text-[16px] whitespace-pre-wrap">Cafe Hopping</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#707991] text-[12px]">17:08</p>
    </div>
  );
}

function Message3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Message">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#707991] text-[14px]">
        <span className="leading-[18px] text-[#011627]">Lewis</span>
        <span className="leading-[18px]">{`: All paid mate 😆  `}</span>
      </p>
    </div>
  );
}

function Texts3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="Texts">
      <Name3 />
      <Message3 />
    </div>
  );
}

function MenuIcon() {
  return <div className="rounded-[100px] shrink-0 size-[40px]" data-name="Menu Icon" />;
}

function Search1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Search">
          <path d={svgPaths.pcc952f1} fill="var(--fill-0, #707991)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Search() {
  return (
    <div className="bg-[#f5f5f5] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[22px]" data-name="Search">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full">
          <Search1 />
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[20px] not-italic relative shrink-0 text-[#707991] text-[16px] w-[121px] whitespace-pre-wrap">Search</p>
        </div>
      </div>
    </div>
  );
}

function EmojiIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Emoji Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Emoji Icon">
          <path d={svgPaths.p1406edf0} fill="var(--fill-0, #707991)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Send Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Send Icon">
          <path d={svgPaths.p11163500} fill="var(--fill-0, #8BABD8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputBar({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-white content-stretch flex gap-[16px] h-[56px] items-center left-[558px] px-[16px] py-[8px] rounded-[12px] top-[898px] w-[694px]"} data-name="Input Bar">
      <EmojiIcon />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#707991] text-[16px] whitespace-pre-wrap">Message</p>
      <SendIcon />
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="heart icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_3314)" id="heart icon">
          <path d={svgPaths.p78a8b00} fill="var(--fill-0, #F71735)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_3314">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="check Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="check Icon">
          <path d={svgPaths.p17864100} fill="var(--fill-0, #011627)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimeEmojiIcon() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Time (Emoji(Icon)">
      <HeartIcon />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#011627] text-[12px]">18:12</p>
      <CheckIcon />
    </div>
  );
}

function Message4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[4px] items-end justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Message">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#011627] text-[16px] whitespace-nowrap">
        <p className="mb-0">Hello! Thank you all for joining me in this art class,</p>
        <p className="mb-0">I look forward to seeing you all soon!</p>
        <p className="mb-0">&nbsp;</p>
        <p>Just wondering when did your love for art start?</p>
      </div>
      <TimeEmojiIcon />
    </div>
  );
}

function MessageOtherUser({ className }: { className?: string }) {
  return (
    <div className={className || "absolute content-stretch flex items-center left-[437px] top-[226px] w-[646px]"} data-name="Message(Other User)">
      <Message4 />
    </div>
  );
}

function HeartIcon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="heart icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_3314)" id="heart icon">
          <path d={svgPaths.p78a8b00} fill="var(--fill-0, #F71735)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_3314">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckIcon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="check Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="check Icon">
          <path d={svgPaths.p17864100} fill="var(--fill-0, #011627)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimeEmojiIcon1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Time (Emoji(Icon)">
      <HeartIcon1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#011627] text-[12px]">18:12</p>
      <CheckIcon1 />
    </div>
  );
}

function Message5() {
  return (
    <div className="bg-[#dde2ff] content-stretch flex flex-col gap-[4px] items-end justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Message">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#011627] text-[16px] whitespace-nowrap">
        <p className="mb-0">Hello! Thank you all for joining me in this art class,</p>
        <p className="mb-0">I look forward to seeing you all soon!</p>
        <p className="mb-0">&nbsp;</p>
        <p>Just wondering when did your love for art start?</p>
      </div>
      <TimeEmojiIcon1 />
    </div>
  );
}

function CheckIcon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="check Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="check Icon">
          <path d={svgPaths.p17864100} fill="var(--fill-0, #011627)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimeEmojiIcon2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Time (Emoji(Icon)">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#011627] text-[12px]">18:12</p>
      <CheckIcon2 />
    </div>
  );
}

function Message6() {
  return (
    <div className="bg-[#dde1ff] content-stretch flex flex-col gap-[4px] items-end justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Message">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#011627] text-[16px] whitespace-nowrap">
        <p className="mb-0">Same! I have also gotten into painting recently. this</p>
        <p>is what i have been working on the past few days</p>
      </div>
      <TimeEmojiIcon2 />
    </div>
  );
}

function Avatar4() {
  return (
    <div className="mr-[-8px] relative rounded-[100px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar} />
    </div>
  );
}

function Avatar5() {
  return (
    <div className="mr-[-8px] relative rounded-[100px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar2} />
    </div>
  );
}

function Avatar6() {
  return (
    <div className="mr-[-8px] relative rounded-[100px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar3} />
    </div>
  );
}

function Avatars() {
  return (
    <div className="content-stretch flex items-center pr-[8px] relative shrink-0" data-name="avatars">
      <Avatar4 />
      <Avatar5 />
      <Avatar6 />
    </div>
  );
}

function Name4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#011627] text-[16px] whitespace-pre-wrap">Art Class</p>
    </div>
  );
}

function LastSeen() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Last Seen">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#707991] text-[14px]">last message 12 mins ago</p>
    </div>
  );
}

function Texts4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="Texts">
      <Name4 />
      <LastSeen />
    </div>
  );
}

function OtherUser() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="(Other User)">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center py-[8px] relative size-full">
          <Avatars />
          <Texts4 />
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="absolute inset-[20%]" data-name="search icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="search icon">
          <path d={svgPaths.pcc952f1} fill="var(--fill-0, #707991)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchMessages() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="Search Messages">
      <SearchIcon />
    </div>
  );
}

function CallIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="call icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="call icon">
          <path d={svgPaths.p6146900} fill="var(--fill-0, #707991)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CallIcon() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative rounded-[100px] shrink-0" data-name="Call Icon">
      <CallIcon1 />
    </div>
  );
}

function MoreIcon1() {
  return (
    <div className="absolute inset-[20%]" data-name="more icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more icon">
          <path d={svgPaths.p34136b00} fill="var(--fill-0, #707991)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MoreIcon() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[40px]" data-name="More Icon">
      <MoreIcon1 />
    </div>
  );
}

function TopBarGroup({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-white content-stretch flex gap-[8px] h-[83px] items-start left-[344px] px-[16px] py-[8px] top-0 w-[1169px]"} data-name="Top Bar (Group)">
      <div aria-hidden="true" className="absolute border-[#d9dce0] border-b border-solid inset-0 pointer-events-none" />
      <OtherUser />
      <SearchMessages />
      <CallIcon />
      <MoreIcon />
    </div>
  );
}

function Avatar7() {
  return (
    <div className="absolute left-[374px] rounded-[100px] size-[40px] top-[797px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar3} />
    </div>
  );
}

function Avatar8() {
  return (
    <div className="absolute left-[374px] rounded-[100px] size-[40px] top-[296px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar2} />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute h-[268px] left-[437px] rounded-[16px] top-[569px] w-[338px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgFrame1} />
    </div>
  );
}

function DateGroup() {
  return (
    <div className="bg-[#7d81b1] content-stretch flex flex-col items-end justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Date Group">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[16px] text-white">Today</p>
    </div>
  );
}

function CheckIcon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Check Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Check Icon">
          <path d={svgPaths.p17864100} fill="var(--fill-0, #292D32)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Time() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Time">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#292d32] text-[12px]">18:16</p>
      <CheckIcon3 />
    </div>
  );
}

function Message7() {
  return (
    <div className="bg-[#dadada] content-stretch flex flex-col gap-[4px] items-end justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Message">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#011627] text-[16px]">i started drawing since i was a kid, its just natural for me :)</p>
      <Time />
    </div>
  );
}

function MessageYou({ className }: { className?: string }) {
  return (
    <div className={className || "absolute content-stretch flex items-center justify-end left-[1383px] top-[389px] w-[94px]"} data-name="Message(You 2)">
      <Message7 />
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-[#f4f5f7] relative size-full" data-name="MacBook Pro 14' - 8">
      <div className="absolute bg-white h-[1009px] left-px top-0 w-[343px]" />
      <div className="absolute content-stretch flex gap-[16px] h-[72px] items-center left-0 px-[16px] py-[12px] top-[258px] w-[343px]" data-name="Channel Chat List (Item)">
        <Avatar />
        <Texts />
      </div>
      <div className="absolute content-stretch flex gap-[16px] h-[72px] items-center left-px px-[16px] py-[12px] top-[341px] w-[343px]" data-name="Channel Chat List (Item)">
        <Avatar1 />
        <Texts1 />
      </div>
      <div className="absolute content-stretch flex gap-[16px] h-[72px] items-center left-px px-[16px] py-[12px] top-[175px] w-[342px]" data-name="Group Chat List 2 (Item)">
        <Avatar2 />
        <Texts2 />
      </div>
      <div className="absolute content-stretch flex gap-[16px] h-[72px] items-center left-0 px-[16px] py-[12px] top-[92px] w-[343px]" data-name="Group Chat List (Item)">
        <Avatar3 />
        <Texts3 />
      </div>
      <div className="absolute content-stretch flex gap-[16px] h-[44px] items-center left-px px-[16px] py-[8px] top-[21px] w-[342px]" data-name="Search Bar">
        <MenuIcon />
        <Search />
      </div>
      <InputBar />
      <div className="absolute left-[22px] overflow-clip size-[37px] top-[24px]" data-name="chevron_backward">
        <div className="absolute bottom-1/4 left-[33.33%] right-[35.83%] top-1/4" data-name="icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4083 18.5">
            <path d={svgPaths.p1f182300} fill="var(--fill-0, #707991)" id="icon" />
          </svg>
        </div>
      </div>
      <MessageOtherUser />
      <div className="absolute content-stretch flex items-center left-[437px] top-[226px] w-[646px]" data-name="Message(Other User)">
        <Message5 />
      </div>
      <div className="absolute content-stretch flex items-center left-[437px] top-[471px] w-[646px]" data-name="Message(Other User)">
        <Message6 />
      </div>
      <TopBarGroup />
      <Avatar7 />
      <Avatar8 />
      <Image />
      <div className="absolute bg-white h-[83px] left-[344px] top-[79px] w-[1169px]" />
      <div className="absolute bg-[#5661f6] inset-[8.76%_75.26%_85.13%_24.4%] rounded-[5px]" />
      <div className="absolute font-['Work_Sans:SemiBold',sans-serif] font-semibold leading-[0] left-[395px] text-[#5661f6] text-[14px] top-[87px] whitespace-nowrap">
        <p className="mb-0">
          <span className="leading-[20px]">{`Date: `}</span>
          <span className="font-['Work_Sans:Regular',sans-serif] font-normal leading-[20px]">30 Sep 2026</span>
        </p>
        <p className="mb-0">
          <span className="leading-[20px]">{`Time: `}</span>
          <span className="font-['Work_Sans:Regular',sans-serif] font-normal leading-[20px]">2pm - 3pm</span>
        </p>
        <p>
          <span className="leading-[20px]">{`Location: `}</span>
          <span className="font-['Work_Sans:Regular',sans-serif] font-normal leading-[20px]">Hougang CC</span>
        </p>
      </div>
      <div className="absolute content-stretch flex items-center justify-center left-[344px] top-[180px] w-[1168px]" data-name="Date Sent">
        <DateGroup />
      </div>
      <MessageYou />
    </div>
  );
}
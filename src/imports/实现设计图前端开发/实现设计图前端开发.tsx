import svgPaths from "./svg-6ut17dr8jr";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 15L11 17L15 13" id="Vector_3" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[31.992px] relative shrink-0 w-[140.402px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[#171a1f] text-[24px] top-[-0.5px] tracking-[-0.5297px] whitespace-nowrap">撰写工作日志</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[7.992px] h-[31.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Heading />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#565d6d] text-[16px] top-[-0.75px] tracking-[-0.3125px] whitespace-nowrap">结构化记录每日工作，方便团队同步与月底总结。</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.992px] h-[63.984px] items-start left-[24px] top-[24px] w-[351.949px]" data-name="Container">
      <Container3 />
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[80.496_0_0] h-[20.004px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">2026/04/13</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g clipPath="url(#clip0_47_234)" id="Icon">
          <path d="M5.33203 1.33301V3.99903" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M10.6641 1.33301V3.99903" id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p23bba500} id="Vector_3" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M1.99951 6.66504H13.9966" id="Vector_4" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
        <defs>
          <clipPath id="clip0_47_234">
            <rect fill="white" height="15.9961" width="15.9961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[12px] h-[42.996px] items-center left-[738px] px-[12.75px] py-[0.75px] rounded-[8px] top-[24px] w-[133.992px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Text />
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[111.984px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Button />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[111px] items-start pb-[0.75px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(243,244,246,0.4)] border-b-[0.75px] border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27.996px] relative shrink-0 w-[119.977px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#323232] text-[20px] top-[-0.5px] tracking-[-0.4492px] whitespace-nowrap">工作事项列表</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g id="Icon">
          <path d="M3.33252 7.99805H12.6636" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M7.99805 3.33252V12.6636" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[20.004px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[14px] text-center text-white top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">添加事项</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1abc9c] h-[39.996px] relative rounded-[8px] shrink-0 w-[111.961px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.992px] items-center px-[15.996px] relative size-full">
        <Icon2 />
        <Text1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[76.746px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-b-[0.75px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[18.75px] pt-[18px] px-[19.992px] relative size-full">
          <Heading1 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 2.66602">
            <path d={svgPaths.p2d0f4b00} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[15.996px] top-[15.62px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(26,188,156,0.2)] h-[29.988px] left-[43.99px] rounded-[4px] top-[8.63px] w-[58.781px]" data-name="Container">
      <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-bold leading-[0] left-[7.99px] not-italic text-[#1abc9c] text-[0px] top-[0.99px] tracking-[-0.3125px] whitespace-nowrap">
        <span className="leading-[26px] text-[16px]">事项</span>
        <span className="font-['Inter:Regular','Noto_Sans_JP:Bold','Noto_Sans_SC:Bold',sans-serif] font-normal leading-[16px] text-[12px]">{` 5`}</span>
      </p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g clipPath="url(#clip0_47_216)" id="Icon">
          <path d="M1.99951 3.99903H13.9966" id="Vector" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p18cabf80} id="Vector_2" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.pe968880} id="Vector_3" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M6.66504 7.33155V11.3306" id="Vector_4" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M9.33106 7.33155V11.3306" id="Vector_5" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
        <defs>
          <clipPath id="clip0_47_216">
            <rect fill="white" height="15.9961" width="15.9961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[778.52px] pl-[7.992px] pr-[8.004px] rounded-[8px] size-[31.992px] top-[7.63px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g id="Icon">
          <path d={svgPaths.p3b0e2100} id="Vector" stroke="var(--stroke-0, #171A1F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[814.51px] pl-[7.992px] pr-[8.004px] rounded-[8px] size-[31.992px] top-[7.63px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#e8f5f1] h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(224,224,224,0.3)] border-b-[0.75px] border-solid inset-0 pointer-events-none" />
      <Container8 />
      <Container9 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`工作事项名称 `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[830.508px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[12px] pr-[80px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(10,10,10,0.5)] tracking-[-0.1504px] whitespace-nowrap">运维</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[13.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16212 8.16212">
            <path d={svgPaths.p15bf3800} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16602" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16212 8.16212">
            <path d={svgPaths.p2a24b0c0} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16602" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[22px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4.004px] px-[4.004px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g id="Icon">
          <path d={svgPaths.pa970400} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p38552e00} id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[3.988px] h-[22px] items-center left-[780.53px] pl-[0.004px] top-[7px] w-[42px]" data-name="Container">
      <Button4 />
      <Icon7 />
    </div>
  );
}

function CategorySelector() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="CategorySelector">
      <TextInput />
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[7.992px] h-[63.996px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <CategorySelector />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[0] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">
        <span className="leading-[20px]">{`工作描述 `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[16.67%] left-1/4 right-[20.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99756 11.9971">
            <path d={svgPaths.p3a369be3} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[7.99px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.67%_20.83%_83.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33155 1.33301">
            <path d="M6.66504 0.666504H0.666504" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_41.67%_16.67%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33155 1.33301">
            <path d="M6.66504 0.666504H0.666504" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33239 11.9974">
            <path d={svgPaths.p2ab4c200} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[39.98px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33106 9.33106">
            <path d={svgPaths.p2e0dca00} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9971 1.33301">
            <path d="M0.666504 0.666504H11.3306" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[71.98px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container15() {
  return <div className="absolute bg-[#dee1e6] h-[19.992px] left-[107.96px] top-[10px] w-[0.996px]" data-name="Container" />;
}

function Icon11() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[87.46%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33967 1.33301">
            <path d="M0.666504 0.666504H0.673169" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[87.46%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33967 1.33301">
            <path d="M0.666504 0.666504H0.673169" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[87.46%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33967 1.33301">
            <path d="M0.666504 0.666504H0.673169" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[33.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99756 1.33301">
            <path d="M0.666504 0.666504H9.33106" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[33.33%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99756 1.33301">
            <path d="M0.666504 0.666504H9.33106" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99756 1.33301">
            <path d="M0.666504 0.666504H9.33106" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[116.95px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66455 1.33301">
            <path d="M0.666504 0.666504H7.99805" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66455 1.33301">
            <path d="M0.666504 0.666504H7.99805" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66455 1.33301">
            <path d="M0.666504 0.666504H7.99805" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-3/4 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66602 1.33301">
            <path d="M0.666504 0.666504H1.99951" id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-[79.17%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%_-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.99951 3.99902">
            <path d={svgPaths.p185e3800} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-3/4 top-[57.52%]" data-name="Vector">
        <div className="absolute inset-[-23.83%_-50%_-23.83%_-50.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66616 4.12982">
            <path d={svgPaths.p1fae1c00} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[148.95px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon12 />
    </div>
  );
}

function Container16() {
  return <div className="absolute bg-[#dee1e6] h-[19.992px] left-[184.93px] top-[10px] w-[0.996px]" data-name="Container" />;
}

function Icon13() {
  return (
    <div className="h-[15.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.61%_8.57%_37.48%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29348 9.95668">
            <path d={svgPaths.p326b8000} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.48%_41.67%_8.61%_8.57%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29348 9.95668">
            <path d={svgPaths.p33362300} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[193.92px] pt-[6px] px-[6px] rounded-[4px] size-[27.996px] top-[6px]" data-name="Button">
      <Icon13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[40.746px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-b-[0.75px] border-solid inset-0 pointer-events-none" />
      <Button5 />
      <Button6 />
      <Button7 />
      <Container15 />
      <Button8 />
      <Button9 />
      <Container16 />
      <Button10 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.75px] tracking-[-0.1504px] whitespace-nowrap">khin</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[12px] px-[12px] relative size-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function RichTextEditor() {
  return (
    <div className="bg-white h-[138.246px] relative rounded-[8px] shrink-0 w-full" data-name="RichTextEditor">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[0.75px] relative size-full">
          <Container14 />
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[7.992px] h-[166.242px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <RichTextEditor />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[20.004px] left-0 top-0 w-[830.508px]" data-name="Label">
      <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">交付结果</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g clipPath="url(#clip0_47_176)" id="Icon">
          <path d={svgPaths.p119bdb50} id="Vector" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.pb4478e0} id="Vector_2" stroke="var(--stroke-0, #1ABC9C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
        <defs>
          <clipPath id="clip0_47_176">
            <rect fill="white" height="15.9961" width="15.9961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[20.004px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-[28px] not-italic text-[#1abc9c] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">上传文件</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex gap-[7.992px] h-[36px] items-center left-[715.55px] px-[17.496px] py-[1.5px] rounded-[8px] top-0 w-[114.961px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.5px] border-[rgba(26,188,156,0.4)] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Icon14 />
      <Text2 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[707.555px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(86,93,109,0.5)] tracking-[-0.1504px] whitespace-nowrap">输入链接地址...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[12px] size-[15.996px] top-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g clipPath="url(#clip0_47_172)" id="Icon">
          <path d={svgPaths.p2f0f2800} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p25912940} id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
        <defs>
          <clipPath id="clip0_47_172">
            <rect fill="white" height="15.9961" width="15.9961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[707.555px]" data-name="Container">
      <TextInput1 />
      <Icon15 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[36px] left-0 top-[28px] w-[830.508px]" data-name="Container">
      <Button11 />
      <Container20 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g id="Icon">
          <path d={svgPaths.p30ce6f80} id="Vector" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p2a350500} id="Vector_2" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d={svgPaths.p1446c940} id="Vector_3" stroke="var(--stroke-0, #EC4899)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[21.48px] min-w-px relative rounded-[4px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#ec4899] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[16px] left-[6.75px] not-italic text-[#ec4899] text-[12px] top-[3.49px] whitespace-nowrap">设计稿</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[21.48px] relative shrink-0 w-[73.488px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.992px] items-center relative size-full">
        <Icon16 />
        <Text3 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular','Noto_Sans_SC:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">设计稿_v2.png</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9ca3af] text-[12px] top-[0.75px] whitespace-nowrap">2.4 MB</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[655.547_0_0] h-[36px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#f9f9f9] content-stretch flex gap-[12px] h-[57.492px] items-center left-0 pl-[10.746px] pr-[78.727px] py-[10.75px] rounded-[8px] top-[76px] w-[830.508px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container22 />
      <Container23 />
    </div>
  );
}

function FileUploadSection() {
  return (
    <div className="h-[133.488px] relative shrink-0 w-full" data-name="FileUploadSection">
      <Label2 />
      <Container19 />
      <Container21 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[427.711px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[15.996px] items-start pt-[15.996px] px-[15.996px] relative size-full">
        <Container11 />
        <Container13 />
        <FileUploadSection />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[475.711px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container10 />
    </div>
  );
}

function WorkItemsList() {
  return (
    <div className="bg-white h-[553.957px] relative rounded-[10px] shrink-0 w-full" data-name="WorkItemsList">
      <div aria-hidden="true" className="absolute border-[#e0e0e0] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start p-[0.75px] relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[585.949px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[15.996px] px-[15.996px] relative size-full">
        <WorkItemsList />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 15.9961">
        <g clipPath="url(#clip0_47_203)" id="Icon">
          <path d={svgPaths.p1aeac6c0} id="Vector" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M7.99805 10.6641V7.99805" id="Vector_2" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
          <path d="M7.99805 5.33203H8.00472" id="Vector_3" stroke="var(--stroke-0, #565D6D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33301" />
        </g>
        <defs>
          <clipPath id="clip0_47_203">
            <rect fill="white" height="15.9961" width="15.9961" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20.004px] relative shrink-0 w-[55.98px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_JP:Medium','Noto_Sans_SC:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#171a1f] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">重点说明</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[7.992px] h-[20.004px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon17 />
      <Heading2 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_JP:Regular','Noto_Sans_SC:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[14px] tracking-[-0.1504px] whitespace-nowrap">需要明天继续完善拖拽功能的兼容性，确保跨协助的稳定性...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[0.75px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white h-[101.496px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[0.75px] pt-[16.746px] px-[16.746px] relative size-full">
        <Container25 />
        <TextInput2 />
      </div>
    </div>
  );
}

function ImportantNotes() {
  return (
    <div className="h-[117.492px] relative shrink-0 w-full" data-name="ImportantNotes">
      <div className="content-stretch flex flex-col items-start px-[15.996px] relative size-full">
        <Container24 />
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white h-[43.992px] relative rounded-[8px] shrink-0 w-[93.48px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#dee1e6] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[46.74px] not-italic text-[#171a1f] text-[14px] text-center top-[12.49px] tracking-[-0.1504px] whitespace-nowrap">取消</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[24px] size-[13.992px] top-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9922 13.9922">
        <g clipPath="url(#clip0_47_212)" id="Icon">
          <path d={svgPaths.pd32e240} id="Vector" stroke="var(--stroke-0, #19191F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16602" />
          <path d={svgPaths.pd9b6f40} id="Vector_2" stroke="var(--stroke-0, #19191F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16602" />
        </g>
        <defs>
          <clipPath id="clip0_47_212">
            <rect fill="white" height="13.9922" width="13.9922" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#1abc9c] flex-[1_0_0] h-[43.992px] min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon18 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_SC:Medium','Noto_Sans_JP:Medium',sans-serif] font-medium leading-[20px] left-[73.98px] not-italic text-[#19191f] text-[14px] text-center top-[12.49px] tracking-[-0.1504px] whitespace-nowrap">发布日志</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[628.547px] h-[43.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Button12 />
      <Button13 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[rgba(243,244,246,0.2)] h-[92.742px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[rgba(243,244,246,0.4)] border-solid border-t-[0.75px] inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pt-[24.75px] px-[24px] relative size-full">
        <Container26 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[907.184px] items-start overflow-clip relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[895.992px]" data-name="Container">
      <Header />
      <Container4 />
      <ImportantNotes />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#fafafa] h-[1198.5px] relative shrink-0 w-full" data-name="App">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[654.504px] py-[32px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="实现设计图前端开发">
      <App />
    </div>
  );
}
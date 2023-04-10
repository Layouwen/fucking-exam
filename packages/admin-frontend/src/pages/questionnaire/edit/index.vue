<template>
  <n-tabs type="line" animated :value="mode" @update:value="onChangeTab">
    <n-tab-pane :name="EditMode.TEXT" tab="文本模式">
      <div>
        <NButton @click="onClearInputText">清空文本</NButton>
        <NButton @click="onParseText">解析</NButton>
      </div>
      <div class="flex">
        <div class="w-[50%]">
          <NInput v-model:value="inputText" type="textarea" rows="40" placeholder="请输入你的问题" />
        </div>
        <div class="w-[50%] flex-shrink">
          <div>{{ questionnaireData?.paperName }}</div>
          <div v-for="i in questionnaireData?.questions">
            <div>{{ showSubjectAndAnswer(i) }}</div>
            <div v-for="(option, index) in i.options">{{ OPTIONS_LETTER[index] }} {{ option.label }}</div>
          </div>
        </div>
      </div>
    </n-tab-pane>
    <n-tab-pane :name="EditMode.VISUALIZATION" tab="操作模式">1</n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
enum EditMode {
  TEXT,
  VISUALIZATION,
}

enum QuestionType {
  SINGLE_CHOICE = 'singleChoice',
  MULTIPLE_CHOICE = 'multipleChoice',
}

type Question = {
  answers?: string[];
  answer?: string;
  subject: string;
  options: { label: string; value: string }[];
  analyze: string;
  type: QuestionType;
};

type QuestionnaireData = { paperName: string; questions: Question[] };

import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { NInput, NButton, NTabPane, NTabs } from 'naive-ui';
import { questionnaire } from '@fucking-exam/template-data';
import { OPTIONS_LETTER } from '@fucking-exam/constants';

const questionnaireData = ref<QuestionnaireData>();
const mode = ref<EditMode>(EditMode.TEXT);
const inputText = ref(`
22年10月设计基础历年真题（选择题）

俞剑华的代表作是（C）
A 《美育书简》
B 《美术的起源》
C 《最新图案法》
D 《提倡工艺美术与提倡国货》
解析：俞剑华在《最新图 案法》中写道：“图案（design）—语，近 始萌芽于吾国，然十分了解其意义及画法者， 尚不多见

国际工业设计学会(ICSID)成立于（A）
A 1957年
B 1964年
C 1974年
D 1980年
解析：关于工业产品设计的定义，成 立于1957年6月的国际工业设计协会联合会(ICSID )在1980年巴黎举行的第十一次年 会上这样认为：“就批量生产的工业产品而 言，凭借训练、技术知识、经验以及视觉感受 而赋予材料、结构、构造、形态、色彩、表面 加工以及装饰以新的品质和规格，叫作工业产 品设计。”

艺术设计中历史最长，又最具活力、应用范围最广的设计艺术形态是（B）
A 产品设计
B 平面设计
C 环境设计
D 数字媒体设计
解析：平面设计是设计艺术中历史最长，又最 具活力、应用范围最广的设计艺术形态，也是 视觉传达设计的主要课程。它包括字体设计、 标志设计、广告设计、包装设计、书籍艺术设 计、CI设计（企业形象设计）等。图形、文 字、色彩、构成是平面设计的基本元素。通过 印刷而广泛传播、交流是平面设计的本质特 征，从技术、媒介，到心理、功能，综合考虑 适合视觉信息传递的设计方法，从而产生了视 觉传达设计的概念。

对设计艺术来说，有决定性意义的是（A）
A 形式美
B 题材美
C 经济因素
D 市场因素
解析：设计美，是客观审美的首要条件。而这种 美，必须以艺术的形式表达出来。形式美对设 计艺术来说，是有决定性意义的

标志设计的生命是（C）
A 图形
B 文字
C 创意
D 色彩
解析：创意是标志设计的生命。一个有生命的标 志设计，除了特定的符号、信息外，从创意的 角度来看，无不闪烁着智慧的火花。标志创意 的思路是多元的，在不同的创意思维中有着不 同的审美情趣。

下列不属于韩秉华设计的作品是（C）
A 1997年“回归自然”
B 建筑与平面设计书籍设计系列
C 东亚兴莱有限公司书刊
D 新加坡远东百货购物广场宣传手册
解析：东亚兴莱有限公司书刊属于陈幼坚的作品。

表达“现在是设计的黄金时代”的设计师是（D）
A 温格坎·马格
B 雷蒙 ·罗维
C 尼古拉斯 ·格雷姆肖
D 马克 ·德杰尔斯克
解析：在经济繁荣的时代，人们渴望用代表他 们品位的物品装饰自己，用具有特点的产品表 达个性，购置用品的过程成为个人风格不断清 晰化的过程。人们开始强调产品的个性化和个 人风格，提出了 “生活个性化” 口号，对那些 具有创新设计思想并与他们的想法有关的产品 表现出强烈的兴趣。创造需求是营销的一种途 径，创造时尚生活、提倡个性化设计也是消费 产业的一种手段，随之形成的则是整个时尚产 业和环环相扣的产业链。制造商们已认识到消 费者追求的不仅仅是产品的功能，一件产品应 该体现出其所有者的个性。德杰尔斯克指出： 在企业产品和价格完全相同的情况下展开竞争 的时候，外观设计就成了唯一的区别。他的说 法与工业产品设计之父蕾蒙德-罗维在20世纪 30年代提出的观点不谋而合。美国工业产品设 计师协会会长马克-德杰尔斯克更是认为“现 在是设计的黄金时代” 。

着重从外表的、视觉艺术的角度来探讨和研究室内设计问题称为（D）
A 环境艺术设计
B 室内设计
C 室内装修
D 室内装饰装潢
解析：室内装饰。原义是指“器物或商品外表” 的“修饰”，是着重从外表的、视觉艺术的角度来探讨和研究问题。例如对室内地面、墙面、顶棚等 各界面的处理，装饰材料的选用，也可能包括对家 具、灯具、陈设和小品的选用、配置和设计。

1996年以来苹果公司的首席设计师是（D）
A 乔布斯
B 沃兹尼亚克
C 韦恩
D 艾伟
解析：苹果计算机的iMac操纵台基本上是由乔纳森.艾伟一1996年以来苹果公司的首席设计师一手完成的。在进入苹果公司之前，他在英格兰学过工业设计。他作为苹果公司雇员的第-份设计是1992年的“牛顿信息板110"，在此之后，大量的设计任务都指派给了他。P142

认为“朴素而天下莫能与之争美”的是（A）
A 老庄
B 淮南子
C 墨子
D 韩非子
解析：在老庄看来，工艺设计造物的本质和价值在于 维护自然“朴素而天下莫能与之争美”的“真”和 “道”。庄子更是在老子的基础上发展了这种观点 和理论，他把工艺雕饰的世界描述成一个丑恶的缺 乏人的自然本性的世界。P171

关于正方形的正确描述有（ACDE）
A 四边相等
B 最稳定的结构
C 四角相等
D 它的审美属性与其空间位置无关
E 有平稳、单纯、安定、整洁、规则之感
解析：正方形四边相等，四角相等，因具有平稳、单纯、安定、整洁、规则之感，而且它的审美属性与其空间位置无关，即不管水平、垂直还是倾斜放置，它的整体稳定感都不会破坏。三角形一般被视为最稳定的结构。P9

设计艺术文化美的表现形式包括（BD）
A 形式美
B 和谐美
C 自然美
D 境界美
E 社会美
解析：设计艺术蕴含的文化美有两种表现形式： 一是和谐美，二是境界美。

格罗佩斯的设计思想归纳起来有（BDE）
A 艺术与技术统一
B 艺术与技术新统一
C 产品功能是第一位的
D 设计的目的是为了人而不是产品
E 设计要遵循自然和客观的法则规律进行
解析：包豪斯创建者和第一任校长是格罗皮乌 斯。他的设计思想归纳起来有三个要点：一是 "艺术与技术新统一”；二是设计的目的是人 而不是产品；三是设计要遵循自然和客观的法 则规律进行。P24

室内设计的内容包括（ABCD）
A 装修设计
B 空间设计
C 物理环境设计
D 陈设设计
E 景观设计
解析：室内设计包含四个主要内容：一是空间设 计，即对建筑提供的室内空间进行组织调整， 形成所需的空间结构；二是装修设计，即对空 间围护实体的界面进行设计处理；三是陈设设 计，即对室内空间的陈设物品进行设计处理； 四是物理环境设计，即对室内通风、采光等方 面的设计处理。P27

设计艺术的构成因素有（ABCDE）
A 美学因素
B 材质因素
C 经济因素
D 功能与人的因素
E 市场因素
解析：设计艺术的构成因素有：（1）功能与人的因素。（2）美学因素。（3）材质因素。（4）经济因素。（5）市场因素。

下列属于靳埭强先生的作品有（ADE）
A “我的香港”招贴
B 可釆系列化妆品包装
C “洛阳牡丹”书装
D “水-生命-文化”招贴
E 荣华饼屋的标志
解析：undefined

包装设计的审美要素有（BCDE）
A 传统美
B 材料美
C 结构美
D 造型美
E 装饰美
解析：包装设计的审美一般离不开以下四个方面 的要素：(1)材料美。（2）结构美。（3 ）造型美。(4 )装饰美。

节目包装的原则有（ABCDE）
A 统一的原则
B 规范的原则
C 渐变原则
D 超前原则
E 特色原则
解析：节目包装的原则：①统一原则。②规范原则。③渐变原则。④超前原则。⑤特色原则。P81-P82

网页设计的新技术主要包括（BCD）
A MAYA
B Java
C XML
D DHTML
E XSI
解析：对于网站设 计者来说，必须学习跟踪掌握网页设计的新技 术如Java, DHTML、XML等。P92

21世纪的设计趋势是（ABCDE）
A 从物的设计向非物的设计转变
B 从有形的设计向无形的设计转变
C 从产品的设计向服务的设计转变
D 从物质文明向非物质文明转变
E 从实物产品的设计向虚拟产品的设计转变
解析：undefined

下列属于尼古拉斯•格雷姆肖设计的有（BD）
A 莱比锡商贸中心
B 塞维利亚世博会英国馆
C 上海世博会英国馆
D 伦敦滑铁卢火车站
E 伦敦四频道电视台办公楼
解析：undefined

景观设计学所涉及的内容有（ABCDE）
A 新城镇与社区规划
B 区域生态设施设计
C 城市街区景观设计
D 户外游憩景观规划
E 景观建筑设计
解析：undefined

人机工学为设计学科提供的人体尺度参数包括（ABCDE）
A 人的心理因素影响
B 人体结构参数
C 人体负荷适应能力
D 人体动态参数
E 人体机能特征
解析：为工业设计中考虑“ 人的因素”提供人体尺度参数。包括应用人体测量学、人体力学、生理学、心理学等学科的研究方法，对人体结构特征和机能特征进行研究，提供入体各部分的尺寸、体重、体表面积、比重、重心以及人体各部分在活动时相互关系和可及范围等人体结构特征参数;提供人体各部分的发力范围、活动范围、动作速度、频率、重心变化以及动作时惯性等动态参数;分析人的视觉、听觉、触觉、嗅觉以及肢体感觉器官的机能特征:分析人在劳动时的生理变化、能量消耗、疲劳程度以及对各种劳动负荷的适应能力;探讨人在工作中影响心理状态的因素，及心理因素对工作效率的影响等。人体工程学的研究，为工业设计全面考虑“人的因素”提供了人体结构尺度、人体生理尺度和人的心理尺度等数据，这些数据可有效地运用到工业设计中去。P136-P137

中庸思想在中国历史上的作用有（ABDE）
A 反对过度的破坏活动
B 保证了民族文化发展的稳定性
C 引导人们与自然和谐相处
D 使民族文化发展不致中断
E 对于根本性的变革起了一定的阻碍作用
解析：中庸思想在中国历史上有两个方面的作用：第一，保证了民族文化发展的稳定性，反对过度的破坏活动，使文化发展不致中断；第二，对于根本性的变革又起了一定的阻碍作用。P134

中国传统工艺的审美理想与追求有（BD）
A “墨守成规”
B “雕琢归朴”
C “顺物自然”
D “材美工巧”
E “以人为本”
解析：我国传统与民间艺术具有“材美工巧”的艺术追求，“雕琢归朴”审美理想。P143-146
`);

const showSubjectAndAnswer = (question: Question) => {
  const answerTemplate = '$ANSWER';
  switch (question.type) {
    case QuestionType.SINGLE_CHOICE:
      return question.subject.replace(answerTemplate, question.answer);
    case QuestionType.MULTIPLE_CHOICE:
      return question.subject.replace(answerTemplate, question.answers.join(''));
  }
};

const onClearInputText = () => {
  inputText.value = '';
};
const onParseText = () => {
  const _questionnaireData = {
    paperName: '',
    questions: [],
  } as QuestionnaireData;
  const str = inputText.value;

  function splitByEmptyLine(str) {
    return str.split(/\n{2,}/);
  }

  const questionsStrArr = splitByEmptyLine(str);

  try {
    questionsStrArr.forEach((q) => {
      const question = {
        type: QuestionType.SINGLE_CHOICE,
        subject: '',
        options: [],
        analyze: '',
      } as Question;

      const lines = q
        .split(/\n/)
        .map((i) => i.trim())
        .filter((i) => i);

      if (lines.map((i) => i.trim()).filter((i) => i).length === 1) {
        _questionnaireData.paperName = lines[0];
      } else {
        const firstLine = lines.shift();
        const firstLineMatch = firstLine.match(/[(（]([A-Z]+)[)）]/g);
        const answerStr = firstLineMatch[firstLineMatch.length - 1];
        question.subject = firstLine.replace(answerStr, '($ANSWER)').trim();
        const answerStrNoParentheses = answerStr.replace(/[(（]|[)）]/g, '');

        if (answerStrNoParentheses.length > 1) {
          question.type = QuestionType.MULTIPLE_CHOICE;
          question.answers = answerStrNoParentheses.split('');
        } else {
          question.type = QuestionType.SINGLE_CHOICE;
          question.answer = answerStrNoParentheses;
        }

        const lastLine = lines.pop();
        let analyzeMatch = lastLine.match(/^解析：(.*)/);
        if (analyzeMatch) {
          question.analyze = analyzeMatch[1];
        } else {
          lines.push(lastLine);
        }

        question.options = lines.map((line) => {
          const [value, ...textArr] = line.split(' ');
          return {
            value,
            label: textArr.join(''),
          };
        });

        _questionnaireData.questions.push(question);
      }
    });

    questionnaireData.value = _questionnaireData;
  } catch (e) {
    MessagePlugin.warning('解析失败，请先输入内容');
  }
};

const onChangeTab = (value: EditMode) => {
  mode.value = value;
};
</script>
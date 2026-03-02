'use client'

import { motion } from 'framer-motion'
import { SPRING } from '@/lib/motion'
import { useSignalHover } from '@/hooks/useSignalHover'
import PageShell from '@/components/layout/PageShell'
import CalloutBlock from '@/components/ui/CalloutBlock'
import CrossLinks from '@/components/ui/CrossLinks'
import SignalBadge from '@/components/ui/SignalBadge'
import styles from './page.module.css'

const storyExamples = [
  {
    type: 'Money Caller',
    signal: 'green' as const,
    story: `"I had a woman call in not long ago — similar situation to yours, fixed income, really just trying to stretch every dollar. She was on a plan she'd been on for two years and thought it was fine. When I pulled up what was actually available in her area, she was leaving $255 a month on the table — $3,000 a year — in grocery and utility benefit she didn't even know existed. She went quiet for a second, then she said, 'Why didn't anyone tell me this?' She enrolled that day."`,
    why: "She wasn't gaining something new — she was reclaiming money that was already hers.",
  },
  {
    type: 'Scared Switcher',
    signal: 'red' as const,
    story: `"I had a gentleman last week, same situation — been on the same plan for two years, didn't want to touch it. His biggest concern was his cardiologist. Didn't want to lose him no matter what. We spent 60 seconds verifying the doctor, confirmed he was in-network, and he decided to take a look. He called me three weeks later to say the grocery card hit and he hadn't realized how much he'd been spending out of pocket."`,
    why: 'The concern was real. The resolution was fast. The outcome was personal.',
  },
  {
    type: 'Misinformed',
    signal: 'green' as const,
    story: `"I had a client whose doctor's office told her she couldn't switch plans — that her doctor would no longer see her. I asked her if I could check that while she was on the phone. She agreed. The doctor was in-network on three other plans in her area. What the doctor's office actually meant was that they worked with her current plan — not that other plans didn't cover her. Sixty seconds of verification and the wall came down."`,
    why: "Didn't argue with the doctor. Let the system be the authority.",
  },
  {
    type: 'Third Party Controlled',
    signal: 'red' as const,
    story: `"I spoke with a man recently who was on the fence — wanted to talk to his brother first. I suggested we get the brother on the line right then. His brother was the one who said, 'Why would you not do this? You called them about the card and they found it.' The brother became the reason he enrolled, not the reason he didn't."`,
    why: 'Reframes the delay as unnecessary — and shows the third party becoming a closer, not a blocker.',
  },
  {
    type: 'Detail Staller',
    signal: 'yellow' as const,
    story: `"I had a woman who said she wanted to think about it and asked me to call her back next week. I asked her one question before I let her go: 'What is it you need to think through?' She paused and said she wasn't really sure — she just felt like she shouldn't rush. I told her I understood, and then I showed her what the wait was costing her. $210 a month in grocery benefit. $2,520 a year. Every week of 'thinking about it' had a number. She enrolled before we hung up."`,
    why: "Named the stall for what it was, without making her feel foolish for it. Made the cost of the pause concrete.",
  },
  {
    type: 'Veteran',
    signal: 'green' as const,
    story: `"I talk to veterans about this all the time — and the concern makes complete sense if nobody's ever explained how these two things actually work together. I had a gentleman, 22 years Army, used the VA for everything, didn't want to touch it. I told him he wasn't risking anything. His VA covers everything at the VA. This plan covers everything outside the VA — the specialist his VA doesn't have, dental, vision, the ER three states away when he's visiting his daughter. They don't compete. They stack. He asked me why no one had ever explained it that way. We enrolled him that day."`,
    why: 'Recontextualizes the two systems as additive. The VA stays. This adds to it.',
  },
]

function StoryCard({ ex }: { ex: typeof storyExamples[number] }) {
  const hover = useSignalHover(ex.signal)
  return (
    <div className={styles.storyCard} {...hover}>
      <div className={styles.storyHeader}>
        <span className="label">{ex.type}</span>
        <SignalBadge signal={ex.signal} />
      </div>
      <p className={`body-md ${styles.storyText}`}>{ex.story}</p>
      <p className={styles.storyWhy}><strong>Why it works:</strong> {ex.why}</p>
    </div>
  )
}

export default function StorytellingPage() {
  return (
    <PageShell signal="neutral">
      <motion.h1
        className="display-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        Storytelling
      </motion.h1>

      <motion.blockquote
        className={styles.heroQuote}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        A story is not a rebuttal. A rebuttal pushes back. A story walks around the wall.
      </motion.blockquote>

      <motion.p
        className={`body-lg ${styles.intro}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.15 }}
      >
        The Four Pillars and the Call Type Framework are the architecture. Storytelling is what makes them survive contact with a real call. An agent can understand every pillar in a training session and still freeze when a client goes off script. A well-constructed story — 60 seconds, built around a client who looked exactly like this one and made this exact move — bridges the gap between knowing the system and deploying it under pressure.
      </motion.p>

      {/* When to use */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">When to Use a Story</h2>
        <div className={styles.twoCol}>
          <CalloutBlock type="green">
            <strong>Reach for a story when:</strong>
            <ul className={styles.list}>
              <li>The client is on the fence — not a hard no, but not moving forward</li>
              <li>They&rsquo;ve raised an objection and a straight rebuttal would feel like an argument</li>
              <li>The call has drifted into doubt or hesitation</li>
              <li>You&rsquo;ve made the case logically and it hasn&rsquo;t landed — try it emotionally</li>
            </ul>
          </CalloutBlock>
          <CalloutBlock type="red">
            <strong>Do not use a story when:</strong>
            <ul className={styles.list}>
              <li>The client is GREEN and ready — don&rsquo;t slow down a moving call. Close.</li>
              <li>The client has a hard, logical barrier — a story won&rsquo;t fix a real problem. Solve it.</li>
              <li>You&rsquo;re using it as filler — know <em>why</em> you&rsquo;re telling it before you start</li>
            </ul>
          </CalloutBlock>
        </div>
      </motion.section>

      {/* 4-Part Structure */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">The 4-Part Structure</h2>
        <p className="body-lg">Every story is built on four parts, delivered in 60 seconds or less.</p>
        <div className={styles.parts}>
          <div className={styles.part}>
            <span className={styles.partNum}>1</span>
            <div>
              <h3 className="heading-md">Someone like you</h3>
              <p className="body-md">Establish that the story subject shares this client&rsquo;s exact situation, concern, or hesitation.</p>
            </div>
          </div>
          <div className={styles.part}>
            <span className={styles.partNum}>2</span>
            <div>
              <h3 className="heading-md">Had the same situation</h3>
              <p className="body-md">Name the specific fear or friction point. The thing <em>this client</em> just said.</p>
            </div>
          </div>
          <div className={styles.part}>
            <span className={styles.partNum}>3</span>
            <div>
              <h3 className="heading-md">Made this move</h3>
              <p className="body-md">The decision to look or enroll. Keep it simple. One sentence.</p>
            </div>
          </div>
          <div className={styles.part}>
            <span className={styles.partNum}>4</span>
            <div>
              <h3 className="heading-md">Here&rsquo;s what changed</h3>
              <p className="body-md">One concrete outcome connected to something <em>this specific client</em> has already told you they care about. This is where the story closes.</p>
            </div>
          </div>
        </div>
        <CalloutBlock type="neutral">
          <strong>The rule:</strong> Part 4 has to land on something the client said earlier in the call. If you can&rsquo;t connect it to their specific situation, you&rsquo;re not ready to tell the story yet — ask one more discovery question first.
        </CalloutBlock>
      </motion.section>

      {/* Story Examples */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Story Examples by Call Type</h2>
        <div className={styles.stories}>
          {storyExamples.map((ex) => (
            <StoryCard key={ex.type} ex={ex} />
          ))}
        </div>
      </motion.section>

      {/* Building Your Own */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={SPRING}
      >
        <h2 className="display-lg">Building Your Own Stories</h2>
        <p className="body-lg">When you close a difficult call — one where the client was hesitant, resistant, or afraid — write down what the client&rsquo;s specific fear was, what you said or showed them that resolved it, and what they said at the end. That is a story. Store it.</p>
        <p className="body-md"><strong>The best stories are true.</strong> They are specific, they are recent, and they are yours.</p>
      </motion.section>

      <CrossLinks links={[
        { label: 'Four Pillars', href: '/pillars' },
        { label: '9 Call Types', href: '/call-types' },
        { label: 'Objection Handbook', href: '/objections' },
      ]} />
    </PageShell>
  )
}

export const SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
}

export const SPRING_FAST = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
}

export const EASE_SPRING = [0.16, 1, 0.3, 1]

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING },
}
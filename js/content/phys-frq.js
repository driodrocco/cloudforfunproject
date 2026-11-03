/* AP Physics free-response practice. */
(function () {
  'use strict';
  globalThis.SW.FRQ.push(
    {
      unit: 'dyn', title: 'Block on a rough ramp (qualitative-quantitative)',
      prompt: 'A block of mass m slides DOWN a ramp tilted at angle theta above the horizontal. The coefficient of kinetic friction is uk.\n(a) Draw or describe a free-body diagram for the block. Label every force.\n(b) Derive an equation for the acceleration of the block in terms of g, theta and uk.\n(c) A student says a heavier block would speed up faster. Is the student right? Explain using your answer to (b).\n(d) For theta = 30 degrees and uk = 0.20, calculate the acceleration.',
      rubric: [
        { pts: 1, text: '(a) Gravity (mg) straight down, normal force perpendicular to the ramp' },
        { pts: 1, text: '(a) Friction up the ramp (opposite the motion), no extra forces' },
        { pts: 1, text: '(b) Uses Fn = mg cos(theta)' },
        { pts: 1, text: '(b) Net force down the ramp: mg sin(theta) - uk mg cos(theta) = ma' },
        { pts: 1, text: '(b) a = g(sin(theta) - uk cos(theta))' },
        { pts: 1, text: '(c) Disagrees: mass cancels, so the acceleration does not depend on mass' },
        { pts: 1, text: '(d) a = 9.8(0.500 - 0.20(0.866)) = 3.20 m/s^2' },
      ],
      model: '(a) Three forces: weight mg straight down, normal force Fn perpendicular to the ramp surface, kinetic friction Ff pointing up the ramp.\n(b) Down the ramp = +. Perpendicular: Fn = mg cos(theta). Along: mg sin(theta) - uk mg cos(theta) = ma, so a = g(sin(theta) - uk cos(theta)).\n(c) The student is wrong. m cancels out of the equation, so every block has the same acceleration on this ramp.\n(d) a = (9.8)(sin 30 - 0.20 cos 30) = (9.8)(0.500 - 0.173) = 3.20 m/s^2.',
    },
    {
      unit: 'osc', title: 'Measuring g with a pendulum (experimental design)',
      prompt: 'You have a string, a small heavy ball, a meterstick and a stopwatch. Design an experiment to find g using a pendulum.\n(a) Describe your procedure in enough detail that another student could repeat it. Say what you measure and how you reduce uncertainty.\n(b) What quantities would you graph so the graph is a straight line? How would you get g from the graph?\n(c) Why should the swing angle be kept small?',
      rubric: [
        { pts: 1, text: '(a) Measures the length L from the pivot to the center of the ball' },
        { pts: 1, text: '(a) Times several full oscillations (for example 10) and divides to get T' },
        { pts: 1, text: '(a) Repeats for several different lengths' },
        { pts: 1, text: '(b) Graph T^2 vs L (or T vs sqrt(L))' },
        { pts: 1, text: '(b) slope = 4pi^2/g, so g = 4pi^2/slope (or matching expression)' },
        { pts: 1, text: '(c) T = 2pi sqrt(L/g) is only accurate for small angles (small-angle approximation)' },
      ],
      model: '(a) Tie the ball to the string. Measure L from the pivot to the center of the ball with the meterstick. Pull the ball aside less than about 10 degrees and release. Time 10 full swings and divide by 10 to get T, which cuts reaction-time error. Repeat for 5 different lengths, doing 3 trials each.\n(b) Since T = 2pi sqrt(L/g), T^2 = (4pi^2/g)L. Graph T^2 (y) vs L (x). The slope is 4pi^2/g, so g = 4pi^2/slope.\n(c) The period formula comes from the small-angle approximation sin(theta) ~ theta. Large swings make the period longer than the formula predicts.',
    },
  );
})();

/**
 * NSM Pace Tables
 * Source: "NSM: Subthreshold Running Kept Simple" by James Copeland
 *
 * Sub-T paces for 3-min, 6-min, and 10-min repetitions, plus easy pace.
 *
 * All paces in seconds per km.
 */

// [5k_seconds, rep3min, rep6min, rep10min, easy_pace]
const RAW_TABLE: [number, number, number, number, number][] = [
  //                           Sub-T paces                Easy pace
  // 5K       rep3    rep6    rep10   easy
  [900, 193, 198, 205, 256], // 15:00 → 3:13, 3:18, 3:25, 4:16 (easy extrapolated)
  [920, 197, 202, 209, 262], // 15:20 → 3:17, 3:22, 3:29, 4:22
  [940, 201, 207, 213, 268], // 15:40 → 3:21, 3:27, 3:33, 4:28
  [960, 205, 211, 217, 274], // 16:00 → 3:25, 3:31, 3:37, 4:34
  [980, 209, 215, 222, 280], // 16:20 → 3:29, 3:35, 3:42, 4:40
  [1000, 213, 219, 226, 286], // 16:40 → 3:33, 3:39, 3:46, 4:46
  [1020, 217, 223, 230, 292], // 17:00 → 3:37, 3:43, 3:50, 4:52
  [1040, 222, 227, 235, 298], // 17:20 → 3:42, 3:47, 3:55, 4:58
  [1060, 226, 232, 239, 302], // 17:40 → 3:46, 3:52, 3:59, 5:02
  [1080, 230, 236, 243, 308], // 18:00 → 3:50, 3:56, 4:03, 5:08
  [1100, 234, 240, 247, 314], // 18:20 → 3:54, 4:00, 4:07, 5:14
  [1120, 238, 244, 252, 320], // 18:40 → 3:58, 4:04, 4:12, 5:20
  [1140, 242, 248, 256, 326], // 19:00 → 4:02, 4:08, 4:16, 5:26
  [1160, 246, 252, 260, 331], // 19:20 → 4:06, 4:12, 4:20, 5:31
  [1180, 250, 256, 264, 337], // 19:40 → 4:10, 4:16, 4:24, 5:37
  [1200, 254, 260, 269, 343], // 20:00 → 4:14, 4:20, 4:29, 5:43
  [1220, 258, 265, 273, 350], // 20:20 → 4:18, 4:25, 4:33, 5:50
  [1240, 262, 269, 277, 355], // 20:40 → 4:22, 4:29, 4:37, 5:55
  [1260, 266, 273, 281, 361], // 21:00 → 4:26, 4:33, 4:41, 6:01
  [1280, 270, 277, 286, 366], // 21:20 → 4:30, 4:37, 4:46, 6:06
  [1300, 274, 281, 290, 372], // 21:40 → 4:34, 4:41, 4:50, 6:12
  [1320, 278, 285, 294, 378], // 22:00 → 4:38, 4:45, 4:54, 6:18
  [1340, 282, 289, 298, 383], // 22:20 → 4:42, 4:49, 4:58, 6:23
  [1360, 286, 293, 303, 389], // 22:40 → 4:46, 4:53, 5:03, 6:29
  [1380, 290, 297, 307, 395], // 23:00 → 4:50, 4:57, 5:07, 6:35
  [1400, 294, 302, 311, 401], // 23:20 → 4:54, 5:02, 5:11, 6:41
  [1420, 298, 306, 315, 406], // 23:40 → 4:58, 5:06, 5:15, 6:46
  [1440, 302, 310, 319, 412], // 24:00 → 5:02, 5:10, 5:19, 6:52
  [1460, 306, 314, 323, 418], // 24:20 → 5:06, 5:14, 5:23, 6:58
  [1480, 310, 318, 328, 423], // 24:40 → 5:10, 5:18, 5:28, 7:03
  [1500, 314, 322, 332, 429], // 25:00 → 5:14, 5:22, 5:32, 7:09
  [1520, 318, 326, 336, 434], // 25:20 → 5:18, 5:26, 5:36, 7:14
  [1540, 322, 330, 340, 440], // 25:40 → 5:22, 5:30, 5:40, 7:20
  [1560, 326, 334, 344, 446], // 26:00 → 5:26, 5:34, 5:44, 7:26
  [1580, 330, 338, 348, 451], // 26:20 → 5:30, 5:38, 5:48, 7:31
  [1600, 334, 342, 353, 457], // 26:40 → 5:34, 5:42, 5:53, 7:37
  [1620, 337, 346, 357, 463], // 27:00 → 5:37, 5:46, 5:57, 7:43
  [1640, 341, 350, 361, 469], // 27:20 → 5:41, 5:50, 6:01, 7:49
  [1660, 345, 354, 365, 474], // 27:40 → 5:45, 5:54, 6:05, 7:54
  [1680, 349, 358, 369, 480], // 28:00 → 5:49, 5:58, 6:09, 8:00
  [1700, 353, 362, 373, 485], // 28:20 → 5:53, 6:02, 6:13, 8:05
  [1720, 357, 366, 377, 491], // 28:40 → 5:57, 6:06, 6:17, 8:11
  [1740, 361, 370, 381, 497], // 29:00 → 6:01, 6:10, 6:21, 8:17
  [1760, 365, 374, 385, 503], // 29:20 → 6:05, 6:14, 6:25, 8:23
  [1780, 369, 378, 390, 509], // 29:40 → 6:09, 6:18, 6:30, 8:29
  [1800, 373, 382, 394, 514], // 30:00 → 6:13, 6:22, 6:34, 8:34
];

export interface SubTPaces {
  /** Sub-T pace for 3-min repetitions (s/km) */
  rep3min: number;
  /** Sub-T pace for 6-min repetitions (s/km) */
  rep6min: number;
  /** Sub-T pace for 10-min repetitions (s/km) */
  rep10min: number;
  /** Easy run pace (s/km). */
  easy: number;
  /**
   * Estimated marathon race pace (s/km).
   * Approximately 5K pace × 1.14 (standard VDOT equivalence).
   * Used in taper/recovery sessions described as "@ MP".
   */
  marathonPace: number;
}

/**
 * Look up or interpolate NSA/NSM-style training paces.
 * Accepts any 5K time in seconds; extrapolates beyond table bounds.
 */
export function getSubTPaces(fiveKSeconds: number): SubTPaces {
  const table = RAW_TABLE;
  const first = table[0];
  const last = table[table.length - 1];

  // Below minimum: extrapolate backwards
  if (fiveKSeconds <= first[0]) {
    const next = table[1];
    const dFiveK = next[0] - first[0];
    const steps = (first[0] - fiveKSeconds) / dFiveK;
    return buildPaces(
      first[1] - (next[1] - first[1]) * steps,
      first[2] - (next[2] - first[2]) * steps,
      first[3] - (next[3] - first[3]) * steps,
      first[4] - (next[4] - first[4]) * steps,
      fiveKSeconds,
    );
  }

  // Above maximum: extrapolate forward using last interval's delta
  if (fiveKSeconds >= last[0]) {
    const prev = table[table.length - 2];
    const dFiveK = last[0] - prev[0];
    const steps = (fiveKSeconds - last[0]) / dFiveK;
    return buildPaces(
      last[1] + (last[1] - prev[1]) * steps,
      last[2] + (last[2] - prev[2]) * steps,
      last[3] + (last[3] - prev[3]) * steps,
      last[4] + (last[4] - prev[4]) * steps,
      fiveKSeconds,
    );
  }

  // Interpolate between two table rows
  for (let i = 0; i < table.length - 1; i++) {
    const lo = table[i];
    const hi = table[i + 1];
    if (fiveKSeconds >= lo[0] && fiveKSeconds <= hi[0]) {
      const t = (fiveKSeconds - lo[0]) / (hi[0] - lo[0]);
      return buildPaces(
        lo[1] + t * (hi[1] - lo[1]),
        lo[2] + t * (hi[2] - lo[2]),
        lo[3] + t * (hi[3] - lo[3]),
        lo[4] + t * (hi[4] - lo[4]),
        fiveKSeconds,
      );
    }
  }

  return buildPaces(last[1], last[2], last[3], last[4], fiveKSeconds);
}

function buildPaces(
  rep3: number,
  rep6: number,
  rep10: number,
  easy: number,
  fiveKSeconds: number,
): SubTPaces {
  // Marathon pace ≈ 5K pace × 1.14 (standard VDOT equivalence)
  const fiveKPacePerKm = fiveKSeconds / 5;
  const marathonPace = Math.round(fiveKPacePerKm * 1.14);
  return {
    rep3min: Math.round(rep3),
    rep6min: Math.round(rep6),
    rep10min: Math.round(rep10),
    easy: Math.round(easy),
    marathonPace,
  };
}

/**
 * Estimate 5K time from a 10K time using VDOT equivalence.
 * Ratio ~0.482 matches Daniels VDOT tables (e.g. 35:20 10K → ~17:01 5K).
 */
export function estimate5KFrom10K(tenKSeconds: number): number {
  return Math.round(tenKSeconds * 0.482);
}

/**
 * Estimate 5K time from a half marathon time.
 */
export function estimate5KFromHM(hmSeconds: number): number {
  return Math.round(hmSeconds * 0.218);
}

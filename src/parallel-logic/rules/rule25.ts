import { persistence, wrapper } from "@/components";
import { Exam, ExamLog, ExamStats } from "@/graph/objects/types";
import { QueueEvent } from "@/queue";
import { Context } from "@/tracing";

export const rule25 = wrapper(
  { name: "rule25", file: __filename },
  async (ctx: Context, event: QueueEvent<ExamLog>) => {
    if (!event.current || !event.previous) {
      return;
    }

    const { stats } = await persistence.getObject<Exam>(
      ctx,
      event.current.exam
    );

    await persistence.updateObject<ExamStats>(
      ctx,
      stats,
      { student_counter: "-1" },
      { author: event.author }
    );
  }
);

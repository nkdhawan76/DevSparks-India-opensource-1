import React from "react";
import { TableSkeleton } from "@/components/common/Skeletons";

export default function ChangelogLoading() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <TableSkeleton rows={6} cols={3} />
    </div>
  );
}

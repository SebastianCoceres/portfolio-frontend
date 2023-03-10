import React, { FunctionComponent } from "react";
import { CategoryTag } from "@/@types/schema";
import { getContrast } from "@/hooks/getContrast";
import Link from "next/link";

const Categories: FunctionComponent<any> = ({
  list,
  classappend,
  displayList,
}) => {
  return (
    <div className={`w-full ${classappend}`}>
      {list.map((tag: CategoryTag) => { 
        return (
          <span
            key={`tag-${tag.id}`}
            className={`${displayList ? "block" : "inline-block"}  mt-1 mr-1`}
          >
            <Link href="/categories">
              <span
                className={`px-2 py-1 rounded-sm text-xs`}
                style={{
                  backgroundColor: tag.color,
                  color: getContrast(tag.color),
                }}
              >
                {tag.name}
              </span>
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Categories;

"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  LayoutGrid,
  Rocket,
  Search,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { useId, useState } from "react";
import styles from "@/components/SmartCampusMaintenanceServiceCallsCaseStudy.module.css";
import type {
  SmartCampusMaintenanceAccordionIconKey,
  SmartCampusMaintenanceAccordionItem
} from "@/lib/smartCampusMaintenanceServiceCallsCaseStudy";

type Props = {
  items: SmartCampusMaintenanceAccordionItem[];
};

const ACCORDION_ICONS: Record<SmartCampusMaintenanceAccordionIconKey, LucideIcon> = {
  context: Building2,
  problem: Search,
  solution: LayoutGrid,
  role: BriefcaseBusiness,
  outcomes: BarChart3,
  redesign: Rocket,
  market: ShieldCheck,
  strategy: Rocket
};

function AccordionItemIcon({ icon }: { icon: SmartCampusMaintenanceAccordionIconKey }) {
  const Icon = ACCORDION_ICONS[icon];

  return <Icon className={styles.accordionIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SmartCampusMaintenanceServiceCallsAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={styles.accordionList}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <article
            className={styles.accordionItem}
            data-open={isOpen ? "true" : "false"}
            key={item.title}
          >
            <h3 className={styles.accordionHeading}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={styles.accordionTrigger}
                id={triggerId}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                type="button"
              >
                <span className={styles.accordionIntro}>
                  <span className={styles.accordionMeta}>
                    <AccordionItemIcon icon={item.icon} />
                    <span className={styles.accordionNumber}>{String(index + 1).padStart(2, "0")}</span>
                  </span>

                  <span className={styles.accordionCopy}>
                    <span className={styles.accordionTitle}>{item.title}</span>
                    <span className={styles.accordionPreview}>{item.preview}</span>
                  </span>
                </span>

                <span className={styles.accordionIndicator} aria-hidden="true">
                  <ChevronDown className={styles.accordionChevron} strokeWidth={1.9} />
                </span>
              </button>
            </h3>

            <div
              aria-hidden={!isOpen}
              aria-labelledby={triggerId}
              className={styles.accordionPanel}
              data-open={isOpen ? "true" : "false"}
              id={panelId}
              role="region"
            >
              <div className={styles.accordionPanelInner}>
                <div className={styles.accordionBody}>
                  {item.blocks.map((block, blockIndex) => {
                    if (block.type === "paragraph") {
                      return (
                        <p className={styles.contentParagraph} key={`${item.title}-${blockIndex}`}>
                          {block.text}
                        </p>
                      );
                    }

                    if (block.type === "list") {
                      return (
                        <ul className={styles.contentList} key={`${item.title}-${blockIndex}`}>
                          {block.items.map((listItem) => (
                            <li className={styles.contentListItem} key={listItem}>
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === "subsection") {
                      return (
                        <div className={styles.subsectionBlock} key={`${item.title}-${blockIndex}`}>
                          <h4 className={styles.subsectionTitle}>{block.title}</h4>
                          <ul className={styles.contentList}>
                            {block.items.map((listItem) => (
                              <li className={styles.contentListItem} key={listItem}>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    if (block.type === "supporting") {
                      return (
                        <aside className={styles.supportingNote} key={`${item.title}-${blockIndex}`}>
                          {block.text.split("\n\n").map((paragraph) => (
                            <p className={styles.supportingNoteText} key={paragraph}>
                              {paragraph}
                            </p>
                          ))}
                        </aside>
                      );
                    }

                    return (
                      <p className={styles.closingText} key={`${item.title}-${blockIndex}`}>
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

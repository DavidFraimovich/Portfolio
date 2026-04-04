"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  LayoutGrid,
  Rocket,
  Target,
  TriangleAlert,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/SmartCampusLearningCenterCaseStudy.module.css";
import {
  type SmartCampusLearningCenterAccordionIconKey,
  type SmartCampusLearningCenterAccordionItem
} from "@/lib/smartCampusLearningCenterCaseStudy";
import { useId, useState } from "react";

type Props = {
  items: SmartCampusLearningCenterAccordionItem[];
};

const ACCORDION_ICONS: Record<SmartCampusLearningCenterAccordionIconKey, LucideIcon> = {
  context: Building2,
  users: UsersRound,
  scope: LayoutGrid,
  role: BriefcaseBusiness,
  kpi: Target,
  expansion: Rocket,
  challenges: TriangleAlert,
  outcome: BarChart3
};

function AccordionItemIcon({ icon }: { icon: SmartCampusLearningCenterAccordionIconKey }) {
  const Icon = ACCORDION_ICONS[icon];

  return <Icon className={styles.accordionIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SmartCampusLearningCenterAccordion({ items }: Props) {
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
            <h2 className={styles.accordionHeading}>
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
            </h2>

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
                          <h3 className={styles.subsectionTitle}>{block.title}</h3>
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

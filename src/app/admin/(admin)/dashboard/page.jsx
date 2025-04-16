"use client";

import { ScaleIcon } from "@heroicons/react/24/outline";
import Card from "./components/card";

const cards = [
  {
    name: "Account balance1",
    href: "#",
    icon: ScaleIcon,
    amount: "$30,659.45",
  },
  {
    name: "Account balance2",
    href: "#",
    icon: ScaleIcon,
    amount: "$30,659.45",
  },
  {
    name: "Account balance3",
    href: "#",
    icon: ScaleIcon,
    amount: "$30,659.45",
  },
];
export default function DashboardPage() {
  return (
    <>
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
        <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {/* {cards.map((card) => (
            <Card key={card.name}>
              <Card.Body>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-400"
                    />
                  </div>
                  <div className="flex-1 w-0 ml-5">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {card.amount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="text-sm">
                  <a
                    href={card.href}
                    className="font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    View all
                  </a>
                </div>
                <a />
              </Card.Footer>
            </Card>
          ))} */}
          <p className="text-4xl font-bold">Selamat datang</p>
        </div>
      </div>
    </>
  );
}

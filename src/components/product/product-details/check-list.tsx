

export default function CheckList({ checklist }: { checklist: any }) {
    return (
        <div className="space-y-4">
            {checklist.map((item:any, i:number) => (
                <div key={i}>
                    <h4 className="font-semibold">{item.title}</h4>
                    <ul className="list-disc pl-5">
                        {item.items.map((point:any, j:number) => (
                            <li key={j}>{point}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

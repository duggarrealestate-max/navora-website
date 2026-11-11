import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';

export function TeamPage(): JSX.Element {
  const teamMembers = [
    { name: 'Alex Harper', role: 'Owner', email: 'alex@wholesale.com' },
    { name: 'Jordan Lee', role: 'Sales Rep', email: 'jordan@wholesale.com' },
    { name: 'Sam Patel', role: 'Sales Rep', email: 'sam@wholesale.com' },
    { name: 'Morgan Reeves', role: 'Operations', email: 'morgan@wholesale.com' },
  ];

  return (
    <div className="space-y-4">
      <Header 
        title="Team" 
        subtitle="Manage your wholesale team"
      >
        <Button size="sm">Add Member</Button>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {teamMembers.map((member) => (
          <Card key={member.name} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-xs font-bold text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{member.name}</p>
                <p className="text-xs text-text-tertiary">{member.role}</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary">{member.email}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="ghost" className="flex-1 h-7 px-2 text-xs">Edit</Button>
              <Button size="sm" variant="ghost" className="flex-1 h-7 px-2 text-xs">Remove</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

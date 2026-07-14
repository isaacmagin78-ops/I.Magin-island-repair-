import { render, screen, fireEvent } from '@testing-library/react';
import RoleToggle from '../RoleToggle';

describe('RoleToggle', () => {
  it('marks the active role as pressed', () => {
    render(<RoleToggle role="parent" onRoleChange={() => {}} />);

    expect(screen.getByRole('button', { name: /parent/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /student/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onRoleChange with the clicked role', () => {
    const onRoleChange = jest.fn();
    render(<RoleToggle role="parent" onRoleChange={onRoleChange} />);

    fireEvent.click(screen.getByRole('button', { name: /student/i }));

    expect(onRoleChange).toHaveBeenCalledWith('student');
    expect(onRoleChange).toHaveBeenCalledTimes(1);
  });
});

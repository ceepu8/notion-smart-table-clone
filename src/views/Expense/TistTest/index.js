import { Button, Input, Select } from '@/components/ui'

const TistTest = () => {
  return (
    <dl className="grid grid-cols-3 gap-8">
      <dd>
        <div>Button</div>
        <ul className="w-full space-y-4">
          <li>
            <Button type="default" label="Button default" fullWidth />
          </li>
          <li>
            <Button type="primary" label="Button primary" />
          </li>
          <li>
            <Button type="ghost" label="Button ghost" />
          </li>
          <li>
            <Button type="dashed" label="Button dashed" />
          </li>
          <li>
            <Button type="link" label="Button link" />
          </li>
          <li>
            <Button type="text" label="Button text" />
          </li>
          <li>
            <Button type="success" label="Button success" />
          </li>
        </ul>
      </dd>
      <dd>
        <div>Input</div>
        <ul className="w-full space-y-4">
          <li>
            <Input />
          </li>
          <li>
            <Input />
          </li>
          <li>
            <Input />
          </li>
          <li>
            <Input />
          </li>
        </ul>
      </dd>
      <dd>
        <div>Select</div>
        <ul className="w-full space-y-4">
          <li>
            <Select placeholder="Select option..." />
          </li>
          <li>
            <Select placeholder="Select option..." mode="multiple" />
          </li>
          <li>
            <Select placeholder="Select option..." mode="tags" />
          </li>
          <li>
            <Select placeholder="Select option..." variant="borderless" />
          </li>
          <li>
            <Select placeholder="Select option..." variant="filled" />
          </li>
          <li>
            <Select placeholder="Select option..." variant="outlined" />
          </li>
        </ul>
      </dd>
    </dl>
  )
}

export default TistTest

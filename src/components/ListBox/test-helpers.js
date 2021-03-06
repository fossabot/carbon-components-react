// Finding nodes in a ListBox
export const findMenuNode = wrapper => wrapper.find('.bx--list-box__menu');
export const findMenuItemNode = (wrapper, index) =>
  wrapper.find('ListBoxMenuItem').at(index);
export const findMenuIconNode = wrapper =>
  wrapper.find('.bx--list-box__menu-icon');
export const findFieldNode = wrapper => wrapper.find('.bx--list-box__field');

// Actions
export const openMenu = wrapper => findFieldNode(wrapper).simulate('click');

// Common assertions, useful for validating a11y props are set when needed
export const assertMenuOpen = (wrapper, mockProps) => {
  expect(findMenuNode(wrapper).children().length).toBe(mockProps.items.length);
  expect(findMenuIconNode(wrapper).prop('className')).toEqual(
    expect.stringContaining('bx--list-box__menu-icon--open')
  );
  expect(findFieldNode(wrapper).props()).toEqual(
    expect.objectContaining({
      'aria-expanded': true,
      'aria-haspopup': true,
      'aria-label': 'close menu',
    })
  );
};
export const assertMenuClosed = wrapper => {
  expect(findMenuIconNode(wrapper).prop('className')).toEqual(
    expect.stringContaining('bx--list-box__menu-icon')
  );
  expect(findMenuIconNode(wrapper).prop('className')).not.toEqual(
    expect.stringContaining('bx--list-box__menu-icon--open')
  );
  expect(findFieldNode(wrapper).props()).toEqual(
    expect.objectContaining({
      'aria-expanded': false,
      'aria-haspopup': true,
      'aria-label': 'open menu',
    })
  );
};

// `GenericItem` corresponds to an item in a collection that is passed to
// MultiSelect that is in a predictable shape and works with the default
// `itemTostring` out of the box.
export const generateGenericItem = index => ({
  id: `id-${index}`,
  label: `Item ${index}`,
  value: index,
});

// `CustomItem` corresponds to a potentially different item structure that
// might be passed into MultiSelect that we would need to supply a custom
// `itemToString` method for
export const generateCustomItem = index => ({
  field: `Item ${index}`,
  value: `Custom value ${index}`,
});

export const generateItems = (amount, generator) =>
  Array(amount)
    .fill(null)
    .map((_, i) => generator(i));

export const customItemToString = ({ field }) => field;

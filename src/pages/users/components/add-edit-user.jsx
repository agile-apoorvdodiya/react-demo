import { Modal } from "../../../components/modal";
import { css } from "../../../constants/classes";

export const AddEditUser = () => {
  return (
    <Modal header="Add user" show="true">
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-name">Name</label>
        <input className={css.INPUT_TEXT} type="text" id="i-name" name="name" />
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-email">Email</label>
        <input
          className={css.INPUT_TEXT}
          type="email"
          id="i-email"
          name="email"
        />
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-password">Password</label>
        <input
          className={css.INPUT_TEXT}
          type="password"
          id="i-password"
          name="password"
        />
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-contact">Contact</label>
        <input
          className={css.INPUT_TEXT}
          type="text"
          id="i-contact"
          name="contact"
        />
      </div>
      <div className="flex align-middle">
        <label htmlFor="i-make-admin">Make admin</label>
        <input
          className="ml-2"
          type="checkbox"
          id="i-make-admin"
          name="makeAdmin"
        />
      </div>
    </Modal>
  );
};

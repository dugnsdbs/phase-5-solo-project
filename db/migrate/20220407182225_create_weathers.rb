class CreateWeathers < ActiveRecord::Migration[6.1]
  def change
    create_table :weathers do |t|
      t.belongs_to :activity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
